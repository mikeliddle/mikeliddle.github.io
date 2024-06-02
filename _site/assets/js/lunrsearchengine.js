
var documents = [{
    "id": 0,
    "url": "http://0.0.0.0:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://0.0.0.0:4000/about",
    "title": "Mediumish Template for Jekyll",
    "body": "This website is built with Jekyll and Mediumish template for Jekyll. It's for demonstration purposes, no real content can be found. Mediumish template for Jekyll is compatible with Github pages, in fact even this demo is created with Github Pages and hosted with Github.  Documentation: Please, read the docs here. Questions or bug reports?: Head over to our Github repository! Buy me a coffeeThank you for your support! Your donation helps me to maintain and improve Mediumish . Buy me a coffee Documentation"
    }, {
    "id": 2,
    "url": "http://0.0.0.0:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://0.0.0.0:4000/",
    "title": "Home",
    "body": "      Featured:                                                                                                                                                                                                           Midi Bass Pedals                              :               :                                                                                                                                                                       Mike                                02 Jun 2024                                                                                                                                              All Stories:                                                                                                     Midi Bass Pedals              :       :                                                                               Mike                02 Jun 2024                                                                                            Cross-Signed Certificates              :       Who do you trust?:                                                                               Mike                13 Jan 2020                                                                                            Designing a Web API              :       Where to start:                                                                               Mike                12 Mar 2019                                                                                            The Trashcan Problem              :       The Problem:                                                                               Mike                30 Jan 2019                                                                                            The Static Blog              :       The Static Blog:                                                                               Mike                23 Jan 2019                                            "
    }, {
    "id": 4,
    "url": "http://0.0.0.0:4000/midi-bass-keys/",
    "title": "Midi Bass Pedals",
    "body": "2024/06/02 - "
    }, {
    "id": 5,
    "url": "http://0.0.0.0:4000/Cross-Signed-Certificates/",
    "title": "Cross-Signed Certificates",
    "body": "2020/01/13 - Who do you trust?One of the earliest internet protocols was http. Very quickly, engineersdiscovered a need to secure content that they sent/received. This lead tothe development of the HTTPS, SSL, and TLS protocols. One of the mainfeatures to this protocol is the reliance on X. 509 Certificates1. Theidea behind certificates is that developers can go to a central authority,request authorization, and have a certificate that others can trust, if theytrust that central authority. This works just fine if every connecting agent has trusts that central authority,however, due to the complexities of X. 509 Certificates, trust verification, andthe diversity of revocation checking methods, certificate revocation iseffectively broken for websites, with most major browsers performing a “besteffort” check if they check at all. Sometimes Certification Authorities are compromised though. In 2011, a reseller (RA) for Comodo (one of the largest CAs) was compromised, allowing several fraudulent certificates to be issued and trusted for google. com and other major domains. Later that year, DigiNotar was also compromised, issuing more fraudulent certs. The mitigation was to revoke the intermediate cert/root cert that was compromised, and remove the certificate from each computer’s trust store. Doing so,however, eliminated trust for all sites who could be trusted, but had certificates issued by Comodo’s reseller or DigiNotar. So those sites were effectively offline until their certificates were re-issued (which is not a definite time frame). Cross-SigningCross-signing a certificate allows for a private/public key pair to be signedby multiple CA’s. By getting a cross-signed certificate, you effectively havetwo certificates that can be used interchangeably depending on trust. In a distributed environment, each node could have a trust authority, with which itissues a certificate. That certificate can then be used to verify trust as, ifwe trust our peer, and they trust another node, we can trust that node. Along the same lines, having multiple certificates allows for redundancy in asystem. If our noe has a certificate issued by Comodo and Digicert, andour system was operating during 2011, once Comodo was removed from trust onthe different nodes, the nodes would continue to operate uninterrupted becauseof the redundant certificate. This issue is rare, however, with computational power increasing every year,as well as connectivity speeds, it is increasingly difficult to detect a compromise. This leads many systems to rotate certificates on a regular interval so that even if the certificate is compromised, it can’t damage the system for anysignificant period of time.       X. 509 on Wikipedia &#8617;    "
    }, {
    "id": 6,
    "url": "http://0.0.0.0:4000/Designing-a-Web-API/",
    "title": "Designing a Web API",
    "body": "2019/03/12 - Where to startIn designing the Web API for TrashTalk, there are many thing I would dodifferent. With that disclaimer, the approach I took was making the bestof what I had. I was given a team of 7 students and whatever we knew towork with. The first step was to understand what the web application needed to do. I met with the founder of this company and reviewed the requirements andput into words a more formal specification. I then chose a chief architectfrom the team and we set out on creating an architectural document andspecification. We designed the initial database and outlined the routesand how the routes should look, then turned to the team and startedworking. The first step to any good web API is a clear specification offunctionality and resources. Without that, you’ll never know what to build. Technologies: My dad, a Ph. D. in Computer Science, recently asked me about our technologydecisions going into this project. My answer to him as to why we chose Vueand Flask on an Apache server was, “That’s what most people knew. ” Ourfront-end developers all knew Vue, and one was very proficient in settingup a Vue project. Likewise, the back-end developers all knew python, andone had experience setting up a flask project from scratch. I hadexperience setting up, configuring, and maintaining Apache servers. So thechoice was made. Use what you know when you need to move fast. Now, reflecting on our choices, the technologies employed fit our needsreally well. Our Database is currently hosted through AWS using theirdatabase tools, and our server is an EC2 virtual server. The plan is tomigrate the code to a serverless setup, reducing expenses and increasingperformance. Flask applications transfer to serverless systems very easilyso the choice to use Flask as an application framework was great! Vue. js has been less promising. We serve the pages statically, but being aSPA, it’s still hard to get a lot of good SEO on our page, though nottoo difficult, and it takes a little while to build the site and migrate,but using a separate build server and deploying the static pages only wouldspeed up the deploy process and should be happening already. Databases and CAP Theorem: We chose a relational database for a couple of reasons:  We can afford to localize data into separate databases per customer or groupings of customers.  RDBMS’s are very fast at filtering data and getting specific pieces of data or joining related resources even without direct id’s.  We knew how to run SQL queries. Looking at the data and how we use it, a relational database is an ok fit,excluding two use-cases, and we care most about availability. Partitionsare easy to handle by having multiple databases and a serverlessarchitecture. Localities can be directed to different regions on AWS andmultiple services can cooperate easily without knowing about each other. Availability is achieved by moving serverless and having multipledatabases and auto-scaling those. These are known problems. A note on SQL vs NOSQL: The data we are using is largely relational however, using a NOSQL databasemight fit better for our use case on getting the container status. If Ihave a database table for sensor events, telling us fill-level, andcontainers, telling us where the container is and how big it is, I need toperform a few Left Outer Joins in order to get the resource as we wouldlike it. Previously, we used firebase, and needed to loop over the entiredataset to find which event was the most recent and then use it. This wasalmost just as bad as what we have moved to. Instead of this, we’vediscussed having a NOSQL database that would store the most recent eventfor each sensor. This removes the need for Left Outer Joins, and speeds upthe process of getting a container’s status, which occurs very frequently. Another potential use-case is our routes. A route consists of an ID,company information, and an ordered collection of containers. Since orderis significant, we want to have an easy way of enforcing that, which couldbe acheived in a NOSQL database. This has been done in SQL databasesbefore, and works there, but we could simplify this with a NOSQL database. Resources: This will be covered in my next article. "
    }, {
    "id": 7,
    "url": "http://0.0.0.0:4000/TrashCan-Problem/",
    "title": "The Trashcan Problem",
    "body": "2019/01/30 - The Problem: I currently consult a local startup company that uses IoT sensors tomonitor the status of an organizations trashcans and dumpsters. Moreimportant than trashcans is likely dumpsters, however, since more moneyis wasted by collecting an empty dumpster as opposed to an empty trash can50 feet away from the next. IoT systems create lots of data, which can be really fun to analyze. Ihave been doing a lot of data science lately, and I realized there are alot of features we can add that may help the trashcan situations. Let’s saythat I have a nice campus, like Disneyland, and I want to make sure thatif someone has trash, they can throw it away. How can I ensure that I havemy trashcans in the right place? Method: We are going to look at several similar existing problems to see if thereis already a good way of solving our problem. Likely its been solved, butthere’s a chance that it hasn’t been formalized and we will have to adaptan existing problem or algorithm to our situation. The goal here is tofully understand our problem, it’s complexity and it’s simplicity. If wecan avoid a complicated algorithm, its best to do that. Set Cover Problem (NP-Complete):        Set Cover  Immediately, this seems to be an NP-Complete problem. I need to coveranother set by adding a trashcan. This scared me at first, however, sinceSet-cover is a known NP-Complete problem. So with the 100’s of trashcansthat Disneyland has, we’re exceeding practical run times. But then Irealized that’s not my input-set cardinality, that’s my solution set size. How can we choose a way to represent the sets? Maybe we can triangulatebetween restaurants and rides to call each significant point a point inour sets and specify a bound of 50 feet to allow a trashcan cover a ride,but that doesn’t take into account the amount of trash or popularity ofthe area. So I decided that this wouldn’t be the best-fit problem to thinkof. The Art Gallery Problem (NP-Hard): Then I found the art gallery problem, which is simply this: Wherecan I put the minimum number of security guards to monitor every area ina museum. This works well for our problem, since we are an optimizationproblem, dealing with location and placement, but again, this doesn’t dealdirectly with popularity, i. e. the Mona Lisa wouldn’t be any more heavilyguarded than a child’s hand-turkey in these problems. This problem is alsoNP-Hard, which means that if we could simplify this problem we might beable to find a good algorithm for it, but thinking of our problem like thiswill prove to make it inefficient to solve. K-means Clustering: During my Big Data class, we talked about K-means clustering, which couldbe a great method of visualizing the data. If we plot the quantity of trashproduced as a data-point, with one point for each unit, and the x and ycoordinates are simply location, we can create some good clusters to seeareas where we are not currently collecting on a map, and given a highdensity of data points(every trashcan’s data is in the same spot), if weforce our algorithm to add a cluster (\(k = k + 1\)) then one of theclusters should divide, right? We will revisit clustering. Bubble Charts:        Bubble Chart  I bring this up, as this is how I started to visualize the problem. Thesize of the bubble represents the amount of trash generated in an area,the location of the center of the bubble is the location (lat/lng) of thetrashcan. So if I have two distant bubbles that overlap, I need to insertanother trashcan in the middle. If I have a bubble that gets too big, Ineed to add another trashcan nearby to alleviate the load on the othertrashcan. The problem here is this isn’t an algorithm or problem, just avisualization. But now we have something we can use set-cover and k-meanson. Using a bubble chart, we can plot points proportionally using agaussian normal distribution and create a dataset that we can then coverwith a density based set-cover algorithm or some density-based clusteringalgorithm. DBSCAN:        DBSCAN on a Gaussian Distribution  This algorithm is great for density-based clustering. DBSCAN will, givenan epsilon and min-points, cluster the points accounting for noise, andadd clusters as needed. This can be used to analyze how the trashcollection is currently, answering the question, “Do I need to add anothertrashcan?” If the number of clusters produced by a DBSCAN don’t match theactual number of trashcans, we have an abnormal distribution of density insome area. This assumes, however, that you don’t have any trashcans in thesame place, or side-by-side. This algorithm may help us determine if we need to add another trashcan,based on density. But ultimately, that’s over complicating the issue. Whynot just look at how fast a trashcan is filling up? That’s not our onlyquestion here. We need to know where to place the next trashcan. Conclusion: Our algorithm will be as follows:  We look at the frequency of collection for all trashcans.  We compare that to pre-established thresholds.  We determine who the “neighbors” are for the trashcan that exceeds the threshold.  We generate random points(Gaussian distribution) using a proportional number of points per trashcan to trash generated per trashcan.  Run K-means on the existing dataset with the three centroids being the current trashcan locations Add a new centroid and rerun K-means to determine the optimal placement for the containers.  Rerun 3-6 for each trashcan exceeding the threshold. Analyzing this algorithm we just created, our most complex part is K-meanswhich has a complexity of \(O(k*N*T)\) where T is the number of iteration, k is the number of clusters, and N is the number of samples. This will be repeated for every trashcan, so in worst case, our algorithm will likely be \(O(k^2*N*T)\) Not bad for a set-cover type problem. This solution ignores infrastructure concerns, such as, “that’s a building,I can’t put a trashcan there” but gives a good solution if we are lookingat a campus type location. "
    }, {
    "id": 8,
    "url": "http://0.0.0.0:4000/The-Static-Blog/",
    "title": "The Static Blog",
    "body": "2019/01/23 - The Static BlogThis is my first attempt at making a static blog. I recently realized that I wouldhave to switch my hosting providers and wanted to find a free way to host a blogand my website. My website was made using static HTML pages and a javascript framework(which was, of course, overkill) which is easy to host from github pages or a similarservice. So I changed my DNS entry for my domain and my website was live from github. The issue came, however, when I decided I wanted to start my own tech blog. SuddenlyI had memories of Wordpress come to me and I thought, “hey, maybe a CMS like Wordpressis the best option. ” It’s not hard to map a subdomain to another IP and host a sitesomewhere else, but then I run into the problem that it isn’t free. The problem witha CMS is that you need some sort of back-end management system, whether that’s a MySQLdatabase and templating engine, like wordpress uses, or just a dynamic templating engine. So I looked on Google how to make a static blog, not using a CMS. I still rely on atemplating engine and template, but since all the pages can be statically generated,I don’t have to worry about having a live back-end system that manages the content. Idecided that Jekyll would be the best option, first because Github supports it, but also,it has a large community of support, I can write articles using markdown, and I don’thave to worry about any styling. My reasoning for blogging is simple: I have experience that others can enjoy as well. Ienjoy watching videos on YouTube or reading tech blogs that talk about the cool projectspeople have worked on, as well as reviews of the latest and greatest technology. Similarly,I enjoy reading the experiences others have in their careers and learning from theirexperiences. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});