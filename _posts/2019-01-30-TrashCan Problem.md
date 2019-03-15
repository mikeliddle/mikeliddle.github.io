---
layout:            post
title:             "The Trashcan Problem"
menutitle:         "The Trashcan Problem - Finding an Algorithm"
math:              true
category:          Technology
author:            ML
tags:              Applying Algorithms
---

## The Problem

I currently consult a local startup company that uses IoT sensors to
monitor the status of an organizations trashcans and dumpsters. More
important than trashcans is likely dumpsters, however, since more money
is wasted by collecting an empty dumpster as opposed to an empty trash can
50 feet away from the next.

IoT systems create lots of data, which can be really fun to analyze. I
have been doing a lot of data science lately, and I realized there are a
lot of features we can add that may help the trashcan situations. Let's say
that I have a nice campus, like Disneyland, and I want to make sure that
if someone has trash, they can throw it away. How can I ensure that I have
my trashcans in the right place?

## Method

We are going to look at several similar existing problems to see if there
is already a good way of solving our problem. Likely its been solved, but
there's a chance that it hasn't been formalized and we will have to adapt
an existing problem or algorithm to our situation. The goal here is to
fully understand our problem, it's complexity and it's simplicity. If we
can avoid a complicated algorithm, its best to do that.

## Set Cover Problem (NP-Complete)

{% raw %}
<aside>
   <figure class="right">
      <img src="/media/img/SetCover.png#right" />
      <figcaption>Set Cover</figcaption>
   </figure>
</aside>
{% endraw %}

Immediately, this seems to be an NP-Complete problem. I need to cover
another set by adding a trashcan. This scared me at first, however, since
Set-cover is a known NP-Complete problem. So with the 100's of trashcans
that Disneyland has, we're exceeding practical run times. But then I
realized that's not my input-set cardinality, that's my solution set size.
How can we choose a way to represent the sets? Maybe we can triangulate
between restaurants and rides to call each significant point a point in
our sets and specify a bound of 50 feet to allow a trashcan cover a ride,
but that doesn't take into account the amount of trash or popularity of
the area. So I decided that this wouldn't be the best-fit problem to think
of.

## The Art Gallery Problem (NP-Hard)

Then I found the art gallery problem, which is simply this: Where
can I put the minimum number of security guards to monitor every area in
a museum. This works well for our problem, since we are an optimization
problem, dealing with location and placement, but again, this doesn't deal
directly with popularity, i.e. the Mona Lisa wouldn't be any more heavily
guarded than a child's hand-turkey in these problems. This problem is also
NP-Hard, which means that if we could simplify this problem we might be
able to find a good algorithm for it, but thinking of our problem like this
will prove to make it inefficient to solve.

## K-means Clustering

During my Big Data class, we talked about K-means clustering, which could
be a great method of visualizing the data. If we plot the quantity of trash
produced as a data-point, with one point for each unit, and the x and y
coordinates are simply location, we can create some good clusters to see
areas where we are not currently collecting on a map, and given a high
density of data points(every trashcan's data is in the same spot), if we
force our algorithm to add a cluster ($$k = k + 1$$) then one of the
clusters should divide, right? We will revisit clustering.

## Bubble Charts

{% raw %}
<aside>
   <figure class="left">
      <img src="/media/img/BubblePlot.png#left" />
      <figcaption>Bubble Chart</figcaption>
   </figure>
</aside>
{% endraw %}

I bring this up, as this is how I started to visualize the problem. The
size of the bubble represents the amount of trash generated in an area,
the location of the center of the bubble is the location (lat/lng) of the
trashcan. So if I have two distant bubbles that overlap, I need to insert
another trashcan in the middle. If I have a bubble that gets too big, I
need to add another trashcan nearby to alleviate the load on the other
trashcan. The problem here is this isn't an algorithm or problem, just a
visualization. But now we have something we can use set-cover and k-means
on. Using a bubble chart, we can plot points proportionally using a
gaussian normal distribution and create a dataset that we can then cover
with a density based set-cover algorithm or some density-based clustering
algorithm.

## DBSCAN

{% raw %}
<aside>
   <figure class="right">
      <img src="/media/img/Gaussian.png#right" />
      <figcaption>DBSCAN on a Gaussian Distribution</figcaption>
   </figure>
</aside>
{% endraw %}

This algorithm is great for density-based clustering. DBSCAN will, given
an epsilon and min-points, cluster the points accounting for noise, and
add clusters as needed. This can be used to analyze how the trash
collection is currently, answering the question, "Do I need to add another
trashcan?" If the number of clusters produced by a DBSCAN don't match the
actual number of trashcans, we have an abnormal distribution of density in
some area. This assumes, however, that you don't have any trashcans in the
same place, or side-by-side.

This algorithm may help us determine if we need to add another trashcan,
based on density. But ultimately, that's over complicating the issue. Why
not just look at how fast a trashcan is filling up? That's not our only
question here. We need to know where to place the next trashcan.

## Conclusion

Our algorithm will be as follows:

1. We look at the frequency of collection for all trashcans.
2. We compare that to pre-established thresholds.
3. We determine who the "neighbors" are for the trashcan that exceeds the threshold.
4. We generate random points(Gaussian distribution) using a proportional number of points per trashcan to trash generated per trashcan.
5. Run K-means on the existing dataset with the three centroids being the current trashcan locations
6. Add a new centroid and rerun K-means to determine the optimal placement for the containers.
7. Rerun 3-6 for each trashcan exceeding the threshold.

Analyzing this algorithm we just created, our most complex part is K-means
which has a complexity of $$O(k*N*T)$$ where T is the number of iteration, k is the number of clusters, and N is the number of samples. This will be repeated for every trashcan, so in worst case, our algorithm will likely be $$O(k^2*N*T)$$ Not bad for a set-cover type problem.

This solution ignores infrastructure concerns, such as, "that's a building,
I can't put a trashcan there" but gives a good solution if we are looking
at a campus type location.