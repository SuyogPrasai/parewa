import { NextResponse, NextRequest } from "next/server";

import dbConnect from "@/lib/dbConnect";

import UserModel from "@/models/User";
import RoleModel, { Role } from "@/models/Role";
import PositionModel from "@/models/Positions";

interface User {
    wp_id: string;
    username: string;
    email: string;
    name: string;
    roles?: string[];
    position?: string;
}

const default_position = ""
const default_role = ""

export async function POST(request: NextRequest) {
    const API_KEY = process.env.NEXT_WORDPRESS_API;
    await dbConnect(); // Ensure the database connection is established

    try {
        const SENT_API_KEY = request.headers.get("Authorization");

        // Authorization Check
        if (SENT_API_KEY !== API_KEY) {
            console.log("Unauthorized Access: API keys do not match");
            return NextResponse.json(
                { success: false, message: "Unauthorized Access: API keys do not match" },
                { status: 401 }
            );
        }

        const requestBody = await request.json();
        console.log(requestBody);

        // Validate request type
        if (requestBody['type'] !== "user") {
            return NextResponse.json(
                { success: false, message: "Invalid type, expected 'user'" },
                { status: 400 }
            );
        }

        const user_object: User = {
            wp_id: requestBody['wp_id'],
            username: requestBody['username'],
            email: requestBody['email'],
            name: requestBody['name'],
            roles: requestBody['roles'] || [default_role],
            position: requestBody['position'] || default_position,
        };

        // Handle events
        switch (requestBody['event']) {
            case "created":
                await handleUserCreatedEvent(user_object);
                console.log(`User Created with ID: ${user_object.wp_id}`);
                return NextResponse.json(
                    { success: true, message: `User Created with ID: ${user_object.wp_id}` },
                    { status: 200 }
                );

            case "modified":
                await handleUserModifiedEvent(user_object);
                console.log(`User Modified with ID: ${user_object.wp_id}`);
                return NextResponse.json(
                    { success: true, message: `User Modified with ID: ${user_object.wp_id}` },
                    { status: 200 }
                );

            case "deleted":
                await handleUserDeletedEvent(user_object.wp_id);
                console.log(`User Deleted with ID: ${user_object.wp_id}`);
                return NextResponse.json(
                    { success: true, message: `User Deleted with ID: ${user_object.wp_id}` },
                    { status: 200 }
                );

            default:
                console.log(`Invalid Event Received: ${requestBody['event']}`);
                return NextResponse.json(
                    { success: false, message: `Invalid Event Received: ${requestBody['event']}` },
                    { status: 400 }
                );
        }
    } catch (error: any) {
        console.error("Failed to handle the POST request:", error);
        return NextResponse.json(
            { success: false, message: `Failed to handle the POST request: ${error.message}` },
            { status: 500 }
        );
    }
}

// Helper functions for handling user events// Helper functions for handling user events
async function handleUserCreatedEvent(data: User) {
    const {
        wp_id,
        username,
        email,
        name,
        roles,
    } = data;

    const main_role = roles?.[0] || "author";

    // Fetch the role and extract the _id
    const role = await RoleModel.findOne({ name: main_role });
    if (!role) throw new Error("Failed to find the Role");
    const roleID = role._id

    // Fetch the position and extract the _id
    const position = await PositionModel.findOne({ name: data.position || "Teacher" });
    if (!position) throw new Error("Failed to find the Position");
    const positionID = position._id

    const UserData = {
        wp_id,
        username,
        name,
        email,
        roleID,
        positionID,
        isVerified: false
    };

    const user = await UserModel.create(UserData);
    if (!user) throw new Error("Failed to create the User");
    return user;
}

async function handleUserModifiedEvent(data: User) {
    const {
        wp_id,
        username,
        email,
        name,
        roles,
    } = data;

    const main_role = roles?.[0] || "subscriber";

    // Fetch the role and extract the _id
    const role = await RoleModel.findOne<Role>({ name: main_role });
    if (!role) throw new Error("Failed to find the Role");
    const roleID = role._id

    // Fetch the position and extract the _id
    const position = await PositionModel.findOne({ name: data.position || "Teacher" });
    if (!position) throw new Error("Failed to find the Position");
    const positionID = position._id

    const updateFields = {
        username,
        name,
        email,
        roleID,
        positionID,
    };

    const user = await UserModel.findOneAndUpdate({ wp_id }, updateFields, { new: true });
    if (!user) throw new Error("Failed to find the User");
    return user;
}

async function handleUserDeletedEvent(wp_id: string) {
    const user = await UserModel.findOneAndDelete({ wp_id });
    if (!user) throw new Error("Failed to find the User");
    return user;
}