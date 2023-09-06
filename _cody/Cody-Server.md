---
layout: default
title: Server Implementation
toc_order: 10
---

Implementing your own Cody server is as easy as implementing any other web application that handles HTTP requests.
In this guide we're looking at the necessary steps and the API spec.

## Intro Video

<div class="video-container">
    <iframe class="video" src="https://www.youtube-nocookie.com/embed/0FAgsPNqUV4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Intro Slides

<iframe src="https://slides.com/prooph/event-driven-development/embed?style=light#/18" width="100%" height="420" title="Visual Programming" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Specification

So Cody is a HTTP server that receives requests from prooph board and returns **Cody Responses**. Those responses can be of different types to separate between
informational messages (operation succeeded), questions (should this file really be overridden?) and errors (something went wrong).

A Cody Server should be able to handle a fixed set of HTTP requests:

[View Spec in Swagger Editor on editor.swagger.io](https://editor.swagger.io/?url=https://raw.githubusercontent.com/proophboard/wiki/main/assets/cody/cody-server-spec.yaml)

## NodeJS Example Server

The NodeJS Express server should give you an idea how to implement your own Cody Server. If you want to see more code,
check out the [complete implementation on Github](https://github.com/event-engine/nodejs-inspectio-cody/tree/main/src).

This part of the documentation needs some more :heart:. We'll provide a more detailed explanation soon!
{: .alert .alert-warning}

```javascript
import compression from 'compression';
import cors from 'cors';
import {Request, Response} from "express";
import express from 'express';
import { Server } from 'http';
import http from 'http';
import {CodyConfig, ElementEdited, handleElementEdited, Sync} from './board/code';
import {makeNodeRecord, Node} from './board/graph';
import { greeting, IioSaidHello } from './general/greeting';
import { checkQuestion, handleReply, Reply, test } from './general/question';
import {CodyResponse, CodyResponseType} from './general/response';
import {Map} from "immutable";
// tslint:disable-next-line:no-var-requires
const bodyParser = require('body-parser');

// Simple Express server with some basic configuration like CORS handling
const codyServer = (codyConfig: CodyConfig): Server => {

    const app = express();

    const options: cors.CorsOptions = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
            'Authorization'
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: '*',
        preflightContinue: false,
    };

    // GZIP compress resources served
    app.use(compression());
    app.use(cors(options));
    app.use(bodyParser.json());

    const server = http.createServer(app);

    enum Events {
        IioSaidHello= 'IioSaidHello',
        UserReplied = 'UserReplied',
        ElementEdited = 'ElementEdited',
        ConfirmTest = 'ConfirmTest',
    }

    enum Commands {
        Sync= 'Sync',
        SyncDeleted= 'SyncDeleted'
    }

    // Connect request initiated by prooph board
    app.post(`/messages/${Events.IioSaidHello}`, (req: Request<any, CodyResponse, IioSaidHello>, res: Response<CodyResponse>) => {
        console.log(Events.IioSaidHello);

        // This server supports board synchronization. It's optional, but very useful for advanced code generation
        // Here we just memoize that a sync is required before next code generation run
        codyConfig.context.syncRequired = true;

        // Send back a greeting response (CodyResponse of type: Info with a message saying hello to the user)
        res.send(greeting(req.body.user))
    });

    // Invoked when user replied to a Cody Question.
    app.post(`/messages/${Events.UserReplied}`, (req: Request<any, CodyResponse, Reply>, res: Response<CodyResponse>) => {
        console.log(Events.UserReplied, req.body);

        // handleReply has access to last CodyResponse, which was of type Question and contained a callback
        // that is now invoked with the user response
        handleReply(req.body.reply).then(codyRes => {
            res.send(checkQuestion(codyRes));
        }, reason => {
            res.send({
                cody: "Look's like something went wrong!",
                details: reason.toString(),
                type: CodyResponseType.Error
            });
        });
    });

    // Invoked for each element on prooph board when user triggered Cody.
    // Invocation is always single threaded. You can return a Question to the user and await a reply.
    app.post(`/messages/${Events.ElementEdited}`, (req: Request<any, CodyResponse, ElementEdited>, res: Response<CodyResponse>) => {
        console.log(Events.ElementEdited, req.body);

        // Do not trigger code generation, but instead send back a SyncRequired response
        // prooph board will invoke POST /messages/Sync and when finished trigger ElementEdited again
        if(codyConfig.context.syncRequired) {
            // Reset in-memory node map as preparation for a full sync
            codyConfig.context.syncedNodes = Map<string, Node>();

            res.send({
                cody: 'I need to sync all elements first.',
                details: "Lean back for a moment. I'll let you know when I'm done.",
                type: CodyResponseType.SyncRequired
            })
            return;
        }

        // Map Node.Type to a hook (like onEvent) configured in codyConfig
        handleElementEdited(makeNodeRecord(req.body.node), codyConfig).then(codyRes => {
            // checkQuestion memoize the callback, in case CodyResponse is of type Question
            res.send(checkQuestion(codyRes));
        }, reason => {
            console.log(reason);
            res.send({
                cody: `Uh, sorry. Cannot handle element ${makeNodeRecord(req.body.node).getName()}!`,
                details: reason.toString(),
                type: CodyResponseType.Error
            });
        });
    });

    // If prooph board receives a SyncRequired CodyResponse
    // it switches to synchronization mode and sends all elements in batches to this Sync endpoint.
    // The server should store a list of elements in memory.
    app.post(`/messages/${Commands.Sync}`, (req: Request<any, CodyResponse, Sync>, res: Response<CodyResponse>) => {
        console.log(Commands.Sync, "full sync");

        // Full sync is happening so we can turn off the flag
        codyConfig.context.syncRequired = false;

        let nodes: Node[] = [];

        if(req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(makeNodeRecord);
        } else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: CodyResponseType.Error
            })
            return;
        }

        nodes.forEach(node => {
            console.log("synced node: ", node.getName());
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.set(node.getId(), node);
        })

        // Synced without errors, so we can return an empty response.
        // This avoids spam in the cody console. Empty responses are not shown to the user.
        res.send({
            cody: '',
            type: CodyResponseType.Empty
        });
    });

    // After full sync, prooph board continues synchronizing elements each time a change was made on the board (within the current session).
    // Updated elements are sent in batches to this Sync endpoint. The server should update its in-memory list of elements.
    app.put(`/messages/${Commands.Sync}`, (req: Request<any, CodyResponse, Sync>, res: Response<CodyResponse>) => {
        console.log(Commands.Sync, "edit sync");

        if(codyConfig.context.syncRequired) {
            // Seems like server lost in-memory sync due to restart but prooph board continues to send sync requests
            // Ignore sync until user triggers next code generation and therefore next full sync again
            console.log("sync ignored");
            res.send({
                cody: '',
                type: CodyResponseType.Empty
            });
            return;
        }

        let nodes: Node[] = [];

        if(req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(makeNodeRecord);
        } else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: CodyResponseType.Error
            })
            return;
        }

        nodes.forEach(node => {
            console.log("synced node: ", node.getName(), `(${node.getId()} - ${node.getType()})`, "parent: ", node.getParent()? node.getParent()!.getId() : '-');
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.set(node.getId(), node);
        })

        res.send({
            cody: '',
            type: CodyResponseType.Empty
        });
    });

    // Deleted elements are synced through this endpoint. HTTP DELETE requests do not have a body,
    // hence we use another POST request to let the Cody server remove elements from its in-memory element list.
    // Deleted elements are sent in batches.
    app.post(`/messages/${Commands.SyncDeleted}`, (req: Request<any, CodyResponse, Sync>, res: Response<CodyResponse>) => {
        console.log(Commands.SyncDeleted);

        if(codyConfig.context.syncRequired) {
            // Seems like server lost in-memory sync due to restart but prooph board continues to sent sync requests
            // Ignore sync until user triggers next code generation and therefore next full sync
            console.log("sync ignored");
            res.send({
                cody: '',
                type: CodyResponseType.Empty
            });
            return;
        }

        let nodes: Node[] = [];

        if(req.body.nodes && Array.isArray(req.body.nodes)) {
            nodes = req.body.nodes.map(makeNodeRecord);
        } else {
            res.send({
                cody: 'No nodes given in sync request!',
                type: CodyResponseType.Error
            })
            return;
        }

        nodes.forEach(node => {
            console.log("synced node: ", node.getName(), `(${node.getId()} - ${node.getType()})`, "parent: ", node.getParent()? node.getParent()!.getId() : '-');
            codyConfig.context.syncedNodes = codyConfig.context.syncedNodes.delete(node.getId());
        })

        res.send({
            cody: '',
            type: CodyResponseType.Empty
        });
    });

    // Invoked when user types /talk into console. CodyResponse should be a test question.
    // The endpoint is meant to be used as a health check to verify that question-answer/confirmation mechanism works
    app.post(`/messages/${Events.ConfirmTest}`, (req: Request<any, CodyResponse, any>, res: Response<CodyResponse>) => {
        console.log(Events.ConfirmTest);

        res.send(checkQuestion(test()));
    });

    return server;
}

export default codyServer;

```
