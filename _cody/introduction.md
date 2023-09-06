---
layout: default
title: Introduction
toc_order: 01
---

Cody is a bot or agent that is able to translate an [Event Map Design]({{site.baseUrl}}/continuous_event_storming/event-map-design.html) into working software.
It's available in different variations to match the needs of different use cases.

## Variant 1: Core SDK

The Core SDK is a Cody server that runs on your local machine. prooph board can connect to that server and sends information from a board to it. 
This happens when you open the Cody Console on prooph board, connect to the server in the console and then "trigger Cody" from the context menu of a selected card on prooph board.
See the [Intro Slides]({{site.baseUrl}}/cody/Cody-Server.html#intro-slides) for more information.

The Core SDK is currently available for [NodeJS]({{site.baseUrl}}/cody/nodejs-cody-tutorial.html) and [PHP]({{site.baseUrl}}/cody/php-cody-tutorial.html).

If you would like to use Cody with another language, don't worry, the basic server implementation is quickly developed. Get in touch, if you want to contribute!
The needed endpoints are documented on the [Cody Server page]({{site.baseUrl}}/cody/Cody-Server.html#specification).
{: .alert .alert-info}

## Variant 2: Cody Engine

Cody Engine is a "batteries-included" prototyping and lowcode system. It is also available as Open Source and very flexible. While the Core SDK gives you the freedom to
set up code generation exactly as you need it e.g. integrate it into your existing development stack, Cody Engine provides you with a ready-to-use solution. 
You can experience the power of **Event-Map-To-Code** without hassle. 

Cody Engine is based on NodeJS, TypeScript and React.

Even if you use a different development stack, you might want to take a look at Cody Engine. The **prototyping mode** alone can save you a lot of time. You can quickly validate 
your design, ask stakeholders and users for feedback and only spend expensive implementation time, when you have the **feedback** that the design will work as expected.
{: .alert .alert-success}

