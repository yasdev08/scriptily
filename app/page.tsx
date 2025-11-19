"use client";
import "./globals.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

async function generateScript(prompt: string) {
  const response = await fetch("/api/hf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Failed to generate script.";
}


export default function VideoScriptGenerator() {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [tone, setTone] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [productType, setProductType] = useState("");
const [audience, setAudience] = useState("");
const [cta, setCta] = useState("");
const [language, setLanguage] = useState("English");
const [videoStyle, setVideoStyle] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Constructing the AI prompt
    const prompt = `Generate a ${tone} marketing script for a ${duration}-minute video about "${topic}".
    The product being advertised is a "${productType}", targeted towards "${audience}".
    The script should include a strong call to action: "${cta}" and be in "${language}".
    Use a "${videoStyle}" format to make it more engaging.`;
    try {
      const newScript = await generateScript(prompt);
      setGeneratedScript(newScript);
    } catch (error) {
      setGeneratedScript("Error generating script. Please try again.");
    }

    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        AI Video Script Generator
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Card: Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Your Video Script</CardTitle>
            <CardDescription>
              Fill in the details to generate your script
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Video Topic</Label>
                <Input
                  id="topic"
                  placeholder="Enter your video topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Video Duration (in minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="Enter video duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tone of Voice</Label>
                <Input
                  id="tone"
                  placeholder="e.g., Professional, Casual, Humorous"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productType">Product Type</Label>
                <Input
                  id="productType"
                  placeholder="e.g., Sneakers, Smartphones"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Teenagers, Business Professionals"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta">Call to Action</Label>
                <Input
                  id="cta"
                  placeholder="e.g., Buy Now, Subscribe, Limited Time Offer"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  placeholder="e.g., English, French, Arabic"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoStyle">Video Style</Label>
                <Input
                  id="videoStyle"
                  placeholder="e.g., Explainer, Storytelling, Comparison"
                  value={videoStyle}
                  onChange={(e) => setVideoStyle(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Script"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Card: Generated Script */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Script</CardTitle>
            <CardDescription>
              Your AI-generated video script will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[300px]"
              placeholder="Your generated script will appear here..."
              value={generatedScript}
              readOnly
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={!generatedScript}
              onClick={() => navigator.clipboard.writeText(generatedScript)}
            >
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
