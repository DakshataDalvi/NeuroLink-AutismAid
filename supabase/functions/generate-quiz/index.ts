import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ageGroup, category } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (ageGroup === "kids") {
      systemPrompt = `You are a quiz generator for children aged 6-12. Generate fun, educational quiz questions. Return valid JSON only, no markdown.`;
      userPrompt = `Generate 5 unique quiz questions for kids (ages 6-12) about "${category || "general knowledge"}". 
Each question should be age-appropriate, fun, and educational.

Return JSON in this exact format:
{
  "questions": [
    {
      "q": "question text",
      "options": ["option1", "option2", "option3", "option4"],
      "answer": 0
    }
  ]
}

Where "answer" is the zero-based index of the correct option. Make questions varied and interesting. Topics can include science, nature, math, animals, geography, history, space, or the human body.`;
    } else if (ageGroup === "teens") {
      systemPrompt = `You are a social skills scenario generator for teenagers aged 13-18 on the autism spectrum. Create realistic social scenarios to help them practice communication. Return valid JSON only, no markdown.`;
      userPrompt = `Generate 3 unique real-life social scenarios for teens (ages 13-18) about "${category || "general social skills"}".
Each scenario should help practice communication and social understanding.

Return JSON in this exact format:
{
  "scenarios": [
    {
      "situation": "description of the social situation",
      "options": [
        { "text": "response option", "quality": "great", "feedback": "why this is great" },
        { "text": "response option", "quality": "ok", "feedback": "why this is ok" },
        { "text": "response option", "quality": "poor", "feedback": "constructive feedback" }
      ]
    }
  ]
}

Topics can include: making friends, handling disagreements, understanding sarcasm, asking for help, group projects, dealing with peer pressure, or managing emotions in public.`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid ageGroup" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Parse JSON from the AI response (strip markdown fences if present)
    let parsed;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid AI response format");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-quiz error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
