# Old MacDonald's Farm for Bewildered Furries

## Overview

Old McDonald (OMD) had a website... And on this website they DIDN'T have a plan to implement responsive design!! OMD would like to hire YOU to fix the prob!!

## Scope of work

### Task 1: Centering

The page content needs to be centered using a container div (note that these are not the same as flexbox containers). The maximum width the page content should get to is 1280px and be set in the middle.

As per <https://codepen.io/jmsherry/pen/LGvNPw>, you will write one rule for elements with a class of container and you may insert those divs INSIDE landmark elements, like the `<header>`, `<footer>`, etc. (We do that so we can put a background on the header/footer that goes to the edge of the page whilst using the containers to center/restrict the width of its content)

Also, it's usual for text to be centered on mobile devices and left-aligned on desktop. Please add relevant rules & media queries to achieve this.

** ADVANCED **
If you do this to the page header you may have to re-arrange which item is the flexbox container in the header. I do not mind if you decide not to do this and just leave the header 'as is' (without a container)


### Task 2: Re-factoring existing code

Some of the content has been written 'desktop first'. You'll need to use media queries and re-arrange when the widths are set so that it responds. Stacked on mobile; 2 across on tablet, and; 3 across on desktop

### Task 3: Add your own responsive code

Add a section where the goths are 4 across on desktop; 2 across on tablet and stacked on mobile

## Breakpoints

- phone < 600px
- desktop > 1200px

(use `min-width`)
