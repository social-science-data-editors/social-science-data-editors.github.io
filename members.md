---
layout: page
title: Members
subTitle: Social Science Data Editors
---

<p>The following data and reproducibility editors are current members of the Social Science Data Editors group.</p>

<table class="members-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Affiliation</th>
      <th>Journal(s)</th>
      <th>Guidance</th>
      <th>Policy</th>
      <th>Packages</th>
    </tr>
  </thead>
  <tbody>
    {% for member in site.data.members %}
    <tr>
      <td>{{ member.name }}</td>
      <td>{{ member.affiliation }}</td>
      <td>{% if member.journal_url %}<a href="{{ member.journal_url }}">{{ member.journals }}</a>{% else %}{{ member.journals }}{% endif %}</td>
      <td>{% if member.guidance %}<a href="{{ member.guidance }}">Link</a>{% endif %}</td>
      <td>{% if member.policy %}<a href="{{ member.policy }}">Link</a>{% endif %}</td>
      <td>{% if member.archive %}<a href="{{ member.archive }}">Link</a>{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<p>If you are interested in joining, see the <a href="/#contact">Contact</a> section on the main page.</p>
