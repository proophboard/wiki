---
layout: default
title: Cody Engine Intro
toc_order: 01
---

Looking for a way to bridge the gap between Event Modeling and prototyping or even production-ready solutions?

[Cody]({{site.baseUrl}}/cody/introduction.html) is a barbone system. Cody Engine builds on top of it to provide a ready-to-use prototyping and application framework.

<div class="video-container-yt">
    <iframe class="video" src="https://www.youtube-nocookie.com/embed/ycNambVdQks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## Built on the shoulders of giants

Cody Engine is a **ready-to-use** Open Source solution to transform an [Event Map]({{site.baseUrl}}/continuous_event_storming/event-map-design.html)
into a prototype and if you want also into a production-ready system.

To make this possible, we decided to go all-in with [TypeScript](https://www.typescriptlang.org/). TypeScript gives us a single platform to develop
a web-based **Client-Server-Application**, well suited for an information management system.

## Open Source

You can find the Cody Engine project on [GitHub](https://github.com/proophboard/cody-engine). 

Questions, feedback, ideas and contributions are all welcome! You can use the [Cody Engine Issue Tracker](https://github.com/proophboard/cody-engine/issues){: .alert-link} to get in touch.
{: .alert .alert-info}

## Installation

To install and run Cody Engine you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node.js](https://nodejs.org/en/download/package-manager) installed on your local computer.

Head over to the [Cody Engine README](https://github.com/proophboard/cody-engine#installation) for installation instructions.

## Troubleshooting

Sometimes code generation causes a "Compiler Error" that is then displayed in the Cody Engine frontend. If that happens, try to restart Cody Engine first and then reload the app in the browser.
If the error is still shown, something is broken, and you have to investigate further. If you need help, don't hesitate to open an issue: [Issue](https://github.com/proophboard/cody-engine/issues).

You can restart Cody Engine by stopping the process in the terminal with `Ctrl+C`, and starting it again with `npm run serve`.


