---
layout: default
title: Introduction
toc_order: 01
---

> "We strive for a really fast **feedback-loop** to keep cross-functional teams in the creativity mode as long as possible."

*– Alexander Miertsch, Founder and CEO of prooph software*

Do you know that feeling of being part of a highly productive design session? Energy is flowing between people. Everybody is
engaged. The group seems to be aligned on all levels. 

Unfortunately, it's not that easy to reach this level of productivity. One of the blockers is a slow feedback-loop.
{: .alert .alert-danger}

You might have an idea, and you can quickly share it with the team in a [Continuous Event Storming]({{site.baseUrl}}/continuous_event_storming/what-is-continuous-event-storming.html) session.
But does the idea really work? Is it worth to spend time on it?

To answer those questions, Event Storming might not be enough. You need something real to play with, to feel it. **Prototyping to the rescue!**
{: .alert .alert-info}

You've set up [Cody Engine]({{site.baseUrl}}/cody_engine/introduction.html) to speed up the process of creating a prototype, but how exactly should the 
[Event Map]({{site.baseUrl}}/continuous_event_storming/event-map-design.html) be designed so that Cody can do its magic?

That's the moment **Cody Wizard** comes into play! Cody Wizard is available on every prooph board. It is designed to assist you in Event Map design
and writing the needed [Metadata]({{site.baseUrl}}/board_workspace/Metadata.html) for Cody Engine.

## Access Cody Wizard

You can access the Cody Wizard from the context menu of a [Card]({{site.baseUrl}}/board_workspace/Cards.html) or [Frame]({{site.baseUrl}}/board_workspace/Frames.html).

<a href="{{site.baseurl}}/assets/images/cody-wizard/open_cody_wizard.gif" data-lightbox="Open Cody Wizard" data-title="Open Cody Wizard">
    <span class="lightbox-indicator"></span>
    <img src="{{site.baseurl}}/assets/images/cody-wizard/open_cody_wizard.gif" />
</a>

## Run Cody

Depending on the selected element, Cody Wizard asks you what you want to do and guides you through a multi-step process.
At the bottom left of the dialog you can switch back and forth through the available steps (if steps are available).

Cody Wizard keeps track of every step and when you hit the **Run Cody** button in the bottom right corner, it will pass
the information to Cody. 

When you open Cody Wizard on a [Feature Frame]({{site.baseUrl}}/board_workspace/Frames.html#feature-frame) and run Cody directly from
the Feature step, all information grouped by this Feature will be passed to Cody at once.


## Coming soon

Cody Wizard and Cody Engine are available as beta versions at the moment. We're still working on the last bits for a first stable release.
So you might experience bugs or missing documentation. 

If you want to report a bug or share your feedback with us, you can use the [Cody Engine Issue Tracker](https://github.com/proophboard/cody-engine/issues) on GitHub.
