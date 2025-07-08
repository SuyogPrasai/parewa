

<h1 className="text-3xl md:text-4xl font-bold font-sans" align="center">परेवा_</h1>
<div align="center">

[![Donate](https://img.shields.io/badge/_-Donate-red.svg?logo=githubsponsors&labelColor=555555&style=for-the-badge)](Collaborators.md#collaborators "Donate")
[![YouTube](https://img.shields.io/badge/YouTube-Subscribe-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@parewa_bnks)
![GitHub License](https://img.shields.io/github/license/suyogprasai/parewa?style=for-the-badge&logoColor=white)
[![Commits](https://img.shields.io/github/commit-activity/m/suyogprasai/parewa?label=commits&style=for-the-badge)](https://github.com/suyogprasai/parewa/commits "Commit History")
[![Last Commit](https://img.shields.io/github/last-commit/suyogprasai/parewa/master?label=&style=for-the-badge&display_timestamp=committer)](https://github.com/suyogprasai/parewa/pulse/monthly "Last activity")
</div>
<div align="center">
  
<img 
  src="public/github_images/parewa_logo.png" 
  align="center" 
  width="300"
  alt="Parewa Logo"
/>
</div>

## Table of Contents

- [Introduction](#introduction)
- [Installation and Usage](#installation-and-usage)
- [Features](#features)
- [Installation](#installation)
- [Documentation](#documentation)
- [Tutorials](#usage-tutorials)
- [FAQ's](#common-faqs)
- [Contribution](#contribution)

## Introduction

**Parewa** is a student-driven information delivery platform developed entirely by the students of Budhanilkantha School (BNKS).  
Designed to digitalize internal communication within the school and ensure an effective way to deliver essential notices, it serves as the school’s official system for announcements, updates, and articles.

<br><br>
[![Featured Image](./featured_image.png)](https://www.youtube.com/watch?v=1G9VCFo4SHo)
<p align="center"><i>Click the image for video of the site</i></p>

# Our Features
Parewa empowers seamless communication and engagement with a versatile platform designed for schools. From broadcasting targeted announcements to specific groups to publishing polished articles for the entire community, Parewa offers a comprehensive solution for all your communication needs.


## Key Functionalities

- **Instant Notice Delivery**  
  Effortlessly send real-time announcements to the entire school community through a user-friendly input portal.

- **Targeted Announcements**  
  Deliver messages to specific grades, clubs, or sections, ensuring relevant communication without unnecessary clutter.

- **Article Publishing**  
  Enable students to share well-crafted articles directly on the platform, fostering creativity and community engagement.

- **School-Wide Message Archiving**  
  Keep all communications organized and accessible with a searchable archive, ensuring no notice is ever lost.

- **School Calendar Integration**  
  Stay informed with a centralized view of all scheduled events, seamlessly aligned with the school calendar.

## Installation

To properly install parewa, you need two things for now. First is the wordpress docker image for the backend cms and this repo for hosting the main platform. You may access the docker image and deploy it and connect it to this server.

The installation procedure for this next js application is simple. You can follow the steps below to run a sample of this code in your machine. 
<brs>
> **Prerequesites**
> You need to make sure that you have node and npm installed in your local machine for running this, also make sure to have docker and python installation for running other componemts


  1. **Clone the Repository**
```bash
git clone https://github.com/suyogprasai/parewa
```
2. **Install the Required Dependecies**
```bash
npm install
```
3. **Run the server on your Machine**
```bash
npm run dev
```

You can checkout the scripts on `/scripts` folder on the repository for scripts relating to populating the database using random testing data.


## Documentation

Parewa is made primarily as a two server system with next js acting as the main frontend for the website with wordpress as the headless cms for content management of the site. This allows us for using proper management and segregation of the data and the system. 

<br/>

![Featured Image](public/github_images/architecture.svg)



### Post Sync Plugin 

> [!IMPORTANT]
>Automatically syncs WordPress posts and user data with a Next.js server whenever a post or user is created, updated, deleted, or restored. Supports custom post types and includes secure API key integration for communication.

1. 🔁 **Auto Sync on Events**
It automatically syncs posts and users with a Next.js server on creation, update, deletion, or restoration—no manual actions required.

2. 🧠 **Supports Custom Post Types**
Built specifically for news, article, and announcement post types with tailored payload structures for each.

3. 🔐 **Secure Communication**
All sync requests use a secure API key in the header, ensuring only authorized connections with the Next.js server.

4. 📦 **Rich, Structured Payloads**
Sends detailed JSON data including titles, content, tags, images, author names, roles, and even custom ACF fields like position.

5. 🛠️ **Error Logging for Debugging**
Built-in logging via error_log() helps track sync events and quickly identify any issues during data transfer.

---
**The List of Plugins Being Used in the wordpress site is**
| Serial Number | Plugin Name                     | Version | Author                | 
|---------------|---------------------------------|---------|-----------------------|
| 1             | [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/)          | 6.3.12   | WP Engine             |
| 2             | [Classic Editor](https://wordpress.org/plugins/classic-editor/)                  | 1.6.7    | WordPress Contributors |
| 3             | [All-in-One WP Migration](https://wordpress.org/plugins/all-in-one-wp-migration/)         | 7.81     | ServMask              |
| 4             | [Members](https://wordpress.org/plugins/members/)                         | 3.2.18   | MemberPress           | https://wordpress.org/plugins/members/ |
| 5             | [Post and User Sync Plugin](https://github.com/SuyogPrasai/parewa_cms/releases/tag/parewa)       | 1.6.3     | Suyog Prasai          |parewa |
| 6             | [Ultimate Dashboard](https://wordpress.org/plugins/ultimate-dashboard/)              | 3.8.9    | David Vongries        |
| 7             | [White Label](https://wordpress.org/plugins/white-label/)                     | 3.2.1    | WPManageNinja         |
| 8             | [Widget Disable](https://wordpress.org/plugins/widget-disable/)                  | 2.0.1    | WpDevArt              | 
| 9             | [WP Custom Admin Interface](https://wordpress.org/plugins/wp-custom-admin-interface/)       | 7.9      | Martin Gibson         |

## Usage Tutorials
If you have any concerns exploring the full-scale usage of Parewa, please kindly refer to our [YouTube page](https://www.youtube.com/@parewa_bnks) here. 
It consits of videos on how to use the entire website to the fullest. 







> [!IMPORTANT]
> Whether you have feedback on features, have encountered any bugs, or have suggestions for enhancements, we're eager to hear from you. Your insights help us make the PAREWA more robust and user-friendly.


## Common FAQ's

- **Does Parewa require the user to sign in?** 
Signing in is really optional and its upto you! You won't need an account to view the general notices, but you will need to sign in (with a bnks domain id) specifically if you want to carry out actiivies like voting and polling.

- **Can Parewa be accessed within school only?**
Well yes, Parewa's website can only be accessed within school's intranet. However, if you are out of the boundries of school, you can subscribe to the newsletter on our website, which delivers the notices to you, no matter where you are in the world. 


- **Can Parewa be accessed without a working internet conncetion?**
Absolutely, since parewa's server is hosted in the school's intranet, within the confines of school you could access it even when there is no working internet connection. Note however, that you still need to be connected to the internet even though is is not working.

**If you encounter and come across any sorts of issues be sure to contact us at:**
```bash
bnks.parewa.moderator@gmail.com
```

## Contribution

You can make pull requests to the repo and you should also follow the proper guidelines of github and the community for making the commits. Make sure to follow the code convention so far. The code will be reiviewed and if does good will be implemented in the system.
