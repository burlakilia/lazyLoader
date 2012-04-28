lazyLoader object
=============
Very simple javscript  lazy loader object, you can add into your project, and load huge script file after page load



CSS :
-------------

    	<style>
		#preloader {
		  	width:100%; height:100%; margin:0; padding:0; 
		  	background:#fff url('../images/preloader.gif') no-repeat center center;
			position:absolute;
		  	z-index:999;
			text-align: center;
		}

		#preloader div{ 
			top: 50%;
			position: absolute;
			left: 50%;
			margin: 25px;
		}
	</style>

Javascript :
-------------
	<script src="/static/lazyLoader.js" type="text/javascript"></script>

    	<script type="text/javascript">

        	window.onload = function() {
     
			lazyLoader.addRequest('/static/libs/map/openlayers/OpenLayers_c.js', 920);
			lazyLoader.addRequest('/static/libs/map/OpenStreetMap.js', 4);
			lazyLoader.addRequest('/static/libs/map/OL_Yandex.js', 15);
			lazyLoader.addRequest("/static/libs/map/osm_proxy.js", 2);
			lazyLoader.addRequest("/static/css/layer_style.js", 4);

			lazyLoader.startLoad(init);

			   
		}
		
		function init() {
			console.log("page was load");		
		}
    	</script>

Html :
------------
	
	<div id="preloader"><div>0%</div></div>
