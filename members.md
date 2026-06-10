---
layout: page
title: Members
subTitle: Social Science Data Editors
---

The following data and reproducibility editors are current members of the Social Science Data Editors group.

| Name | Affiliation | Journal(s) | Guidance | Policy |
|------|-------------|------------|----------|--------|
{% for member in site.data.members %}| {{ member.name }} | {{ member.affiliation }} | {{ member.journals }} | {% if member.guidance %}[Link]({{ member.guidance }}){% endif %} | {% if member.policy %}[Link]({{ member.policy }}){% endif %} |
{% endfor %}

If you are interested in joining, see the [Contact](/#contact) section on the main page.
