---
layout: default
title: Troubleshooting
headline: Troubleshooting
toc_order: 10
---

Here you find useful tips in case you hit an error in Cody Play. It's a powerful and flexible tool, but this also means things can go south.

## Cody Play does not start

Check the popup blocker of your browser. prooph board opens Cody Play in a new tab. This is treated as a popup by some blockers.

## Cody can't find some information

In most cases the error messages should tell you exactly what is missing. Double-check the schema of the element passed to Cody as well as rule configuration and the like.

Cody is also checking dependencies. So it might be necessary to pass a linked element to Cody first, and then try again with the one that caused the error.

## Inspecting Play Config

Cody Play is configuration-driven. The metadata configured in prooph board is aggregated to a runtime configuration. You can view this configuration in the Cody Play Backend dialog
accessible from the gear icon in the Cody Play topmenu.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/troubleshooting/playconfig.mp4">
    </video>
</div>

As you can see in the video, all the different parts and components are listed with specific settings. Here you can check if the config looks correctly. 

You can also modify the config, but be careful with this! You might create an inconsistent state that can't be recovered. As long as you have a recent [Playshot]({{site.baseUrl}}/cody_play/playshots) saved, this shouldn't be a problem.
Also make sure to copy changes back to prooph board to keep it in sync.
{: .alert .alert-danger}

## Checking the Database

Cody Play simulates a real database using the browser's local storage. Two different database types are used in combination:

- an Event Store to save the events
- a Document Store to save the read models (information)

The database can be inspected in the Backend dialog, and it can also be modified if you need to.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/troubleshooting/database.mp4">
    </video>
</div>

## Testing the API

Cody Play also ships with its own API client. If you are familiar with Swagger or Postman you will feel at home.
Choose the **Messagebox** tab in the Backend dialog. A dropdown lists all available messages grouped by type:

- Commands: blue messages that trigger business logic
- Queries: green messages that fetch information from the backend for UI views
- Events: orange messages that trigger reactions (policies) and projections

A unique functionality of the Cody Play API Client is the possibility to not only send messages but also change logic within the execution of a message call.
For example business rules are shown that are executed for a specific command or resolve rules for a query.
You can modify these rules and test the effect directly by hitting the **Send Message** button.

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/cody-play/troubleshooting/messagebox.mp4">
    </video>
</div>

A later version of Cody Play will offer a sync feature to sync modifications back to prooph board. For now, you have to copy modifications back on prooph board to persist changes.
{: .alert .alert-warning}

## Checking the Log

Cody Play logs a lot of details to the browser console. If something does not work as expected, it's a good idea to open the developer tools of your browser and check the console output.

## Get Help

Of course, it can also happen that you hit a bug. Feel free to open an [issue](https://github.com/proophboard/cody-engine/issues) on Github in case the above tips don't help to fix your problem.
We're happy to help you with your questions and problems.
