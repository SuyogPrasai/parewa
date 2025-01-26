import NoticeModel from "@/models/Notice";
import ArticleModel from "@/models/Article";

export async function POST(request: Request) {
    const apiKey = process.env.NEXT_WORDPRESS_API;
    try {
        const SENT_API_KEY = request["headers"].get("Authorization");
        const API_KEY = process.env.NEXT_WORDPRESS_API;

        // Authorization Check
        if (SENT_API_KEY !== API_KEY) {
            console.log("Unauthorised Access: API keys do not match")
            return Response.json(
                {
                    success: false,
                    message: "Unauthorised Access: API keys do not match"
                },
                {
                    status: 401
                }
            )
        }

        const { id, event } = await request.json();
        console.log(`Post Handle Request recived  + [${event}] : POST ID = [${id}]`);

        switch (event) {
            case "modified":
                // TODO: If the post is modified then it could have been edited or have been removed
                // Now we send a graph ql query for fetching all the stuff about the post and updating our database
                console.log(`Post Modified with ID: ${id}`)
                break;
            case "published":
                console.log(`Post Published with ID: ${id}`)
                break;
            default:
                console.log("Invalid Event Recieved" + event);
                return Response.json(
                    {
                        success: false,
                        message: "Inavlid Event Recieved" + event
                    },
                    {
                        status: 401
                    }
                )
        }
    }
    catch (Error) {
        console.log("Failed Syncing the Post");
        return Response.json(
            {
                success: false,
                message: "Failed to Sync the Post" + Error
            },
            {
                status: 500
            }
        )
    }
}
