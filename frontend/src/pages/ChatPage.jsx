import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import VoiceRecorder from "../components/VoiceRecorder";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh] max-w-5xl mx-auto bg-gradient-to-tr from-purple-700 via-indigo-800 to-blue-900 rounded-lg shadow-xl overflow-hidden">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative flex flex-col h-full bg-white rounded-lg shadow-md">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
              />
              <MessageList
                className="px-4 py-2 bg-gray-50"
                messageActions={["react", "edit", "delete"]}
              />
              <MessageInput
                focus
                className="border-t border-gray-300 bg-white shadow-inner"
              />
              <div className="px-4 py-2 border-t border-gray-300 bg-gray-100">
                <VoiceRecorder
                  onRecordingComplete={(audioBlob) => {
                    const file = new File([audioBlob], "recording.webm", {
                      type: "audio/webm",
                    });

                    channel.sendFile(file).then((res) => {
                      channel.sendMessage({
                        text: "Sent a voice message 🎙️",
                        attachments: [
                          {
                            type: "file",
                            asset_url: res.file,
                            file_size: file.size,
                            mime_type: file.type,
                            title: file.name,
                          },
                        ],
                      });
                    });
                  }}
                />
              </div>
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
export default ChatPage;
