
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceRole);

    // Get search parameters from URL
    const url = new URL(req.url);
    const query = url.searchParams.get("query");
    const location = url.searchParams.get("location");
    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");
    const type = url.searchParams.get("type");
    const sort = url.searchParams.get("sort") || "newest";

    console.log(`Received search request - Query: ${query}, Location: ${location}, Price Range: ${minPrice}-${maxPrice}, Type: ${type}, Sort: ${sort}`);

    // Start building the query
    let supabaseQuery = supabase.from("properties").select("*");

    // Apply text search if provided
    if (query && query.trim() !== "") {
      // Create a search pattern that looks for the query in title or description
      const searchPattern = `%${query}%`;
      supabaseQuery = supabaseQuery.or(`title.ilike.${searchPattern},description.ilike.${searchPattern}`);
    }

    // Apply location filter if provided
    if (location && location !== "all") {
      supabaseQuery = supabaseQuery.ilike("location", `%${location}%`);
    }

    // Apply price range filters if provided
    if (minPrice && !isNaN(Number(minPrice))) {
      supabaseQuery = supabaseQuery.gte("price", Number(minPrice));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      supabaseQuery = supabaseQuery.lte("price", Number(maxPrice));
    }

    // Apply property type filter if provided
    if (type && type !== "all") {
      supabaseQuery = supabaseQuery.eq("type", type);
    }

    // Apply sorting
    switch (sort) {
      case "price_asc":
        supabaseQuery = supabaseQuery.order("price", { ascending: true });
        break;
      case "price_desc":
        supabaseQuery = supabaseQuery.order("price", { ascending: false });
        break;
      case "newest":
      default:
        supabaseQuery = supabaseQuery.order("created_at", { ascending: false });
        break;
    }

    // Execute the query
    const { data, error } = await supabaseQuery;

    if (error) {
      console.error("Error executing search query:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    console.log(`Search successful, found ${data?.length || 0} properties`);

    // Return the results
    return new Response(
      JSON.stringify({ data, count: data?.length || 0 }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );

  } catch (err) {
    console.error("Unexpected error in search properties function:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
