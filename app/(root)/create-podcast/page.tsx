"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { ReactMediaRecorder } from "react-media-recorder";

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});

const CreatePodcast = () => {
  const router = useRouter();
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('');
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPodcast = useMutation(api.podcasts.createPodcast);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Audio URL:", audioUrl);
    console.log("Recorded Audio:", recordedAudio);
    console.log("Uploaded Audio:", uploadedAudio);

    try {
      setIsSubmitting(true);

      // Validate that at least one valid audio source is provided
      const finalAudioUrl = recordedAudio || uploadedAudio || audioUrl;
      if (!finalAudioUrl) {
        toast({ title: 'Please upload, record, or generate audio' });
        setIsSubmitting(false);
        throw new Error('Audio input is missing');
      }

      // // Check if audioStorageId is set
      // if (!audioStorageId) {
      //   toast({ title: 'Audio storage ID is missing' });
      //   setIsSubmitting(false);
      //   throw new Error('Audio storage ID is missing');
      // }

      // Validate image and voice type
      if (!imageUrl || !voiceType) {
        toast({ title: 'Please generate audio and image' });
        setIsSubmitting(false);
        throw new Error('Image or voice type is missing');
      }

      // Create the podcast using the valid audio URL
      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl: finalAudioUrl, // Use the determined valid audio URL
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId, // Ensure it's not null
        imageStorageId: imageStorageId!, // Ensure it's not null
      });

      toast({ title: 'Podcast created successfully' });
      setIsSubmitting(false);
      router.push('/');
    } catch (error) {
      console.error('Error creating podcast:', error);
      toast({ title: 'Error creating podcast', variant: 'destructive' });
      setIsSubmitting(false);
    }
  }

 // Simulate an audio upload and return a storage ID as a string
// Assuming Id<"_storage"> is a custom type
 //type Id<T> = String; // Example of type alias; adjust accordingly

async function uploadAudioToStorage(file: File): Promise<Id<"_storage">> {
  // Return a mocked storage ID wrapped in the Id type
  return new Promise((resolve) => {
    setTimeout(() => resolve(`mocked-storage-id-${Date.now()}` as Id<"_storage">), 1000);
  });
}

// Handle uploaded audio file
const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) {
    toast({ title: 'No file selected for upload', variant: 'destructive' });
    return;
  }

  try {
    const audioUrl = URL.createObjectURL(file);
    setUploadedAudio(audioUrl);
    setRecordedAudio(null); // Clear recorded audio if an upload occurs

    const storageId = await uploadAudioToStorage(file);
    if (!storageId) throw new Error('Failed to retrieve audio storage ID');
    setAudioStorageId(storageId); // Assign storage ID
    toast({ title: 'Audio uploaded successfully' });
  } catch (error) {
    console.error('Error uploading audio:', error);
    toast({ title: 'Failed to upload audio. Please try again.', variant: 'destructive' });
  }
};


return (
  <section className="mt-10 flex flex-col">
    <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
        <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
          <FormField
            control={form.control}
            name="podcastTitle"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5">
                <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                <FormControl>
                  <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="My podcast" {...field} />
                </FormControl>
                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">Select AI Voice</Label>

            <Select onValueChange={(value) => setVoiceType(value)}>
              <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1 " />
              </SelectTrigger>
              <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                {voiceCategories.map((category) => (
                  <SelectItem key={category} value={category} className="capitalize focus:bg-orange-1">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
              {voiceType && (
                <audio
                  src={`/${voiceType}.mp3`}
                  autoPlay
                  className="hidden"
                />
              )}
            </Select>
          </div>

          <FormField
            control={form.control}
            name="podcastDescription"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5">
                <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                <FormControl>
                  <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                </FormControl>
                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />

          {/* Audio Upload Section */}
          <div className="flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">Upload your audio</Label>

            {/* Hidden Input for Audio Upload */}
            <input
              type="file"
              accept="audio/*"
              id="audio-upload"
              className="hidden"
              onChange={handleAudioUpload}
            />

            {/* Button to Trigger File Upload */}
            <Button
              type="button"
              className={`bg-orange-1 text-white-1 ${isRecording || recordedAudio ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (!(isRecording || recordedAudio)) {
                  document.getElementById('audio-upload')?.click();
                }
              }}
              disabled={isRecording || recordedAudio !== null} // Disable if recording is in progress or if recordedAudio exists
            >
              Upload Audio
            </Button>

            {uploadedAudio && (
              <div className="mt-2 flex items-center gap-2">
                <audio src={uploadedAudio} controls />
                <Button
                  type="button"
                  className="bg-red-500 text-white-1"
                  onClick={() => {
                    setUploadedAudio(null);
                    setRecordedAudio(null); // Clear recorded audio if uploaded audio is removed
                  }}
                >
                  Remove Upload
                </Button>
              </div>
            )}
          </div>
          {/* End of Audio Upload Section */}

          {/* Audio Recording Section */}
          <div className="flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">Record your voice</Label>
            <ReactMediaRecorder
              audio
              onStop={(blobUrl) => {
                setRecordedAudio(blobUrl);
                setUploadedAudio(null); // Clear uploaded audio when recording stops
              }}
              render={({ status, startRecording, stopRecording }) => (
                <div className="flex items-center gap-2">
                  {!isRecording && !recordedAudio && (
                    <Button
                      type="button"
                      className={`bg-orange-1 ${uploadedAudio ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => {
                        if (!uploadedAudio) {
                          startRecording();
                          setIsRecording(true);
                        }
                      }}
                      disabled={!!uploadedAudio} // Disable if uploadedAudio is not null
                    >
                      Start Recording
                    </Button>
                  )}
                  {isRecording && (
                    <Button
                      type="button"
                      className="bg-red-600"
                      onClick={() => {
                        stopRecording();
                        setIsRecording(false);
                      }}
                    >
                      Stop Recording
                    </Button>
                  )}
                  {recordedAudio && (
                    <div className="flex items-center gap-2">
                      <audio src={recordedAudio} controls className="mt-2" />
                      <Button
                        type="button"
                        className="bg-yellow-500"
                        onClick={() => {
                          setRecordedAudio(null);
                          setIsRecording(true);
                          startRecording();
                        }}
                      >
                        Re-record
                      </Button>
                      <Button
                        type="button"
                        className="bg-red-500"
                        onClick={() => setRecordedAudio(null)}
                      >
                        Remove Recording
                      </Button>
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          {/* End of Audio Recording Section */}

          <div className="flex flex-col pt-10">
          
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />

            <div className="mt-10 w-full">
              <Button type="submit" className="text-16 flex h-[60px] w-full items-center justify-center gap-2 bg-orange-1 text-white-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader className="animate-spin text-white" />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  </section>
);
};

export default CreatePodcast;
