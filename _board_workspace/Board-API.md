---
layout: default
title: Board API
---

You can programmatically access and modify a board.

## API Key

For each board that you want to access via API, you need to generate an API Key. You can do this in the Board Settings.

You need to be a board admin to be able to access the Board Settings.
{: .alert .alert-warning}

<div class="video-container">
    <video style="width: 100%" controls>
        <source src="{{site.baseUrl}}/assets/video/board_workspace/Board_API.webm">
    </video>
</div>

Retrieve the client secret from the server and include it as `X-Auth-Secret` header in every request to the API.

## Board Agent

To modify elements on a board via API, you have to send tasks to a Board Agent. The tasks are queued and executed directly on the board
as soon as someone opens it (if it is not already open).

[View Spec in Swagger Editor on editor.swagger.io](https://editor.swagger.io/?url=https://raw.githubusercontent.com/proophboard/wiki/main/assets/cody/board-agent-api-spec.yaml)

Please note: you cannot use the swagger editor to test the API due to CORS restrictions, but you can copy the cUrl commands from the editor and run them from a console.
{: .alert .alert-warning}

