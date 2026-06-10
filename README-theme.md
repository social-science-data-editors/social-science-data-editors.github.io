# Landing Page Jekyll theme

Jekyll theme based on [landing-page bootstrap theme ](http://startbootstrap.com/templates/landing-page/)

## How to use
 - Place a image in `/img/services/`
 - Create posts to display your services. Use the follow as an example:

```txt
---
layout: default
img: ipad.png
category: Services
title: The service title
---
The description of this service
```

## Demo
View this jekyll theme in action [here](https://swcool.github.io/landing-page-theme)

## Screenshot
![screenshot](https://raw.githubusercontent.com/swcool/landing-page-theme/master/img/screenshot.png)

===

For more Jekyll details, read [documentation](http://jekyllrb.com/).
This Jekyll theme used [Freelancer Jekyll theme](https://github.com/jeromelachaud/freelancer-theme/) as reference.

## License
The contents of this repository are licensed under the [Apache
2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

## Version
1.0.1

## Previewing builds from GitHub Actions

The workflow builds a `github-pages` artifact on every run (including pull requests). To download and inspect it locally:

```bash
# Download the artifact from the latest run on a given branch (e.g. memberpage)
RUN_ID=$(GH_PAGER=cat gh api \
  "repos/social-science-data-editors/social-science-data-editors.github.io/actions/runs?branch=memberpage&per_page=1" \
  --jq '.workflow_runs[0].id') \
&& gh run download $RUN_ID \
  --repo social-science-data-editors/social-science-data-editors.github.io \
  --name github-pages \
  --dir /tmp/site-artifact \
&& cd /tmp/site-artifact && tar -xf artifact.tar --no-overwrite-dir
```

Replace `memberpage` with the branch you want to inspect. The extracted files will be in `/tmp/site-artifact/`.
