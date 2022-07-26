---
layout: default
title: Access Rights
---

prooph board offers 3 different levels of setting access rights for boards. This can be done on the board settings page
that you can either reach from the board overview (by clicking on the edit button of a board) or from the top menu on a board workspace.

{: .alert .alert-warning}
Please note: Only board owners and organization admins can access board settings. If you don't have this role, you won't see the edit button or settings entry in the top menu.

The 3 Levels can be found in the Permissions section:

![Permissions]({{site.baseurl}}/assets/images/Access/Permissions.png)

## User Level

You can set **read** and **write** access for a specific user on this level. An input field allows you to look up members of the organization by username or email.
If a member is found your settings become active right away.

If the person is not part of your organization, you can invite them by providing their email address. In this case the person will receive an invitation email with an activation link.

{: .alert .alert-warning}
Access will be granted only if the invited person clicks on the activation link in the email and if you have enough user quota available in the organization. The invited person will be
registered as a guest in the organization. For more information see [Guests]({{site.baseurl}}/access_management/Managing-an-Organization.html#guests){: .alert-link}

Open invitations are also listed in the Permissions section. You can resend an invitation email or revoke an open invitation.

{: .alert .alert-info}
In the top bar of a board workspace you'll find a **share** button (again, only if you're owner or admin). This button gives you quick access to user level permissions. If you forgot to invite someone,
you can quickly do it right there.

## Team Level

![Team Permissions]({{site.baseurl}}/assets/images/Access/Team_Permissions.png)

**read** and **write** access to a board can be granted to an entire team. Select one from the dropdown and click on the **share** button.
Everyone in the team will now have access.

## All (Others) Level

![Anyone Permissions]({{site.baseurl}}/assets/images/Access/Anyone_Permissions.png)

On the **All** tab you can set organization-wide permissions or even allow anyone to access your board.

{: .alert .alert-info}
While user and team permissions will also make the board visible on the board overview for every person, this is not the case for **All** permissions.
So people need to know the direct link to the board.

{: .alert .alert-warning}
Access for anyone works as long as enough user quota is available in the organization. Each unknown person who opens a board is added as [guest]({{site.baseurl}}/access_management/Managing-an-Organization.html#guests){: .alert-link}.
