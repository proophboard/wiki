---
layout: default
title: Tips and Tricks
toc_order: 05
---

You're viewing an old version of the wiki. Head over to the new [Event Modeling section]({{site.baseUrl}}/event_modeling/tips-and-tricks.html).
{: .alert .alert-warning}

## Sketch fast, complete later

Don't try to make the Event Map look perfectly arranged in a collaboration session. Design/sketch fast and assign a responsible person to clean up or add missing details after the session.
This ensures a fast flow and does not kill creativity during collaboration.

## Make use of Tags and Metadata

The Event Map should give all team members a good overview of the system, but not everybody is interested in all information. [Card Metadata]({{site.baseUrl}}/board_workspace/Metadata.html)
can be used to separate technical information like the schema of a command or event from more general information like its name and position in the business flow.
Try to find a balance between always visible and secondary information. [Card Tags]({{site.baseUrl}}/board_workspace/Cards.html#tagging) on the other hand can highlight and group specific information.

## 1-2-4-all Event Modeling

[1-2-4-all](https://www.liberatingstructures.com/1-1-2-4-all/){: target="_blank" rel="noopener noreferrer"} is a collaboration technique that fosters active contribution of all participants.
It can be perfectly combined with Online Event Modeling if you have the right video tooling at hand.

Fortunately, prooph board has exclusive beta access to a video conferencing tool called "Swarply", which allows us to offer Swarply integration (beta version) within the regular prooph board subscription plan.
You can start a Swarply video session on any board by choosing "Join Session" in the top menu and enjoy distance-sensitive video avatars that enable parallel discussions, a precondition for 1-2-4-all.
{: .alert .alert-success}

So let's say your team is in an [Event Modeling session]({{site.baseurl}}/event_modeling/how-to.html#phase-ii-event-modeling-design) to design a new feature collaboratively.
Instead of meeting in a video call and screen share a Jira board, you meet on prooph board with Swarply video avatars turned on.

1. The PO should provide information about the story or epic as usual.
2. Then each team member moves their video avatar to a free space on the board and does a litte Event Storming for them self. This should take 10 - 15 min. It activates the brain to focus on requirements and possible solutions.
3. Next, you pair with another teammate to merge your Event Stormings and create an Event Model. This works well with our distance sensitive video avatars. You don't need breakout rooms to have parallel discussions in the same meeting. Set the timer for another 10 min.
4. Depending on group/team size either repeat step 3 by forming groups of 4 people and merge results or skip the 4-people phase and directly merge results with the whole team.
5. As good Event Modelers, you should have collected Hot Spots with open questions along the way and also have a good visual model at the end that will help you slice the story/epic and define acceptance criteria.
6. Assign open Hot Spots to people for clarification and finish the meeting with a feeling of real productive progress.
