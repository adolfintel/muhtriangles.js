var _RAND=[];
for(var i=0;i<2048;i++)_RAND[i]=Math.random();
function random(x,y){
	var i=~~((x*4753.15654214+y*3837.473437015)%_RAND.length);
	return _RAND[i>=0?i:-i];
}

var NEUTRF=0.7;

function Point(x,y,h,s,l){
	this.x=x;
	this.y=y;
	this.h=h;
	this.s=s;
	this.l=l;
	this.tmul=0.1+random(x,y)*0.5;
}

function Triangle(p1,p2,p3,colorMode){
	this.p1=p1;
	this.p2=p2;
	this.p3=p3;
	if(colorMode=="smooth"){
		this.h = (p1.h + p2.h + p3.h) / 3;
		this.s = (p1.s + p2.s + p3.s) / 3;
		this.l = (p1.l + p2.l + p3.l) / 3;
	}else if(colorMode=="rough"){
		if(random(x,y)<0.33){
			this.h=p1.h;
			this.s=p1.s;
			this.l=p1.l;
		}else if(random(x,y)<0.5){
			this.h=p2.h;
			this.s=p2.s;
			this.l=p2.l;
		}else{
			this.h=p3.h;
			this.s=p3.s;
			this.l=p3.l;
		}
	}
	
}

function isVisible(el){
	var r = el.getBoundingClientRect();
	return r.top+r.height >= 0 &&r.left+r.width >= 0 &&r.bottom-r.height <= (window.innerHeight || document.documentElement.clientHeight) && r.right-r.width <= (window.innerWidth || document.documentElement.clientWidth);
}

var runningInstances=[];

function MuhTriangles(targetId,config){
	this.targetId=targetId;
	if(runningInstances[targetId]){runningInstances[targetId].destroy();}
	config=config||{};
	if(typeof config == "string")try{config=JSON.parse(config);}catch(e){config={}}
	this.GRADIENTMODE=config.gradientMode||"smooth";
	this.GRADIENTINTENSITY=config.gradientIntensity==undefined?0.8:config.gradientIntensity;
	this.GRADIENTTYPE=config.gradientType||"radial";
	this.GRADIENTINVERT=config.gradientInvert||false;
	this.HUEPERIOD=config.huePeriod||86400;
	if(config.customHue!=undefined){
		this.HUEPERIOD=0;
		this.CUSTOMHUE=config.customHue;
	}
	this.SATURATION=config.saturation==undefined?1:config.saturation;
	this.LIGHTNESS=config.lightness==undefined?1:config.lightness;
	this.SPEED=config.speed==undefined?1:config.speed;
	this.DENSITY=config.density==undefined?1:config.density;
	this.INSTABILITY=config.instability==undefined?1:config.instability;
	this.OUTLINE=config.outline==undefined?true:config.outline;
	this.OUTLINECOLOR=config.outlineColor||"rgba(255,255,255,0.12)";
	this.OUTLINETHICKNESS=config.outlineThickness||1;
	this.ALGORITHM=config.model||"hexagons";
	this.FPSLIMIT=config.fps||22;
	this.RESPONSIVE=config.responsiveDensity==undefined?true:config.responsiveDensity;
	this.FORCERENDER=config.forceRender==undefined?false:config.forceRender;
	this.init();
	this.interval=setInterval(this.draw.bind(this),1000/this.FPSLIMIT);
	runningInstances[targetId]=this;
}

MuhTriangles.prototype={
	constructor:MuhTriangles,
	init:function(){
		var canvas=document.getElementById(this.targetId);
		this.SX=0.14/this.DENSITY;
		this.SY=0.18/this.DENSITY;
		if(this.RESPONSIVE){
			var dummy=document.createElement("div");
			dummy.style.width="1em";
			document.body.appendChild(dummy);
			if(canvas.clientWidth>dummy.clientWidth*50){
				this.SX/=2;
				this.SY/=2;
			}
			document.body.removeChild(dummy);
		}
		this.DAMPEN=3/this.INSTABILITY;
		canvas.width=(canvas.clientWidth<10?10:canvas.clientWidth)*(window.devicePixelRatio||1);
		canvas.height=(canvas.clientHeight<10?10:canvas.clientHeight)*(window.devicePixelRatio||1);
		var NX,NY;
		if(canvas.width<canvas.height){
			NX=1/this.SX;
			NY=(canvas.height/canvas.width)/this.SY;
		}else{
			NY=1/this.SY;
			NX=(canvas.width/canvas.height)/this.SX;
		}
		var grid=[], triangles=[];
		for(y=0;y<NY+7;y++){
			grid[y]=[];
			for(x=0;x<NX+8;x++){
				var xf=(x-3)*this.SX, yf=(y-2)*this.SY;
				var f=NEUTRF;
				if(this.GRADIENTTYPE=="radial") f=1-Math.sqrt(Math.pow(((NX*this.SX)/2)-xf,2)+Math.pow(((NY*this.SY)/2)-yf,2)); else
				if(this.GRADIENTTYPE=="horizontal") f= 1-xf*(canvas.width<canvas.height?canvas.width/canvas.height:canvas.height/canvas.width); else
				if(this.GRADIENTTYPE=="vertical") f= 1-yf*(canvas.width<canvas.height?canvas.width/canvas.height:canvas.height/canvas.width); else
				if(this.GRADIENTTYPE=="diagonal1") f= ((1-xf*(canvas.width<canvas.height?canvas.width/canvas.height:canvas.height/canvas.width))+(1-yf*(canvas.width<canvas.height?canvas.width/canvas.height:canvas.height/canvas.width)))/2; else
				if(this.GRADIENTTYPE=="diagonal2") f= ((xf*(canvas.width<canvas.height?canvas.width/canvas.height:canvas.height/canvas.width))+(1-yf*(canvas.width<canvas.height?canvas.width/canvas.height:canvas.height/canvas.width)))/2; else
				if(this.GRADIENTTYPE=="random") f=0.3+random(x,y)*0.7;
				f=(1-this.GRADIENTINTENSITY)*NEUTRF+this.GRADIENTINTENSITY*f;
				f=f<0?0:f>1?1:f;
				if(this.GRADIENTINVERT) f=1-f;
				grid[y][x]=new Point((x-3-random(x,y)/this.DAMPEN)*this.SX,(y-2-random(x,y)/this.DAMPEN)*this.SY,this.CUSTOMHUE!=undefined?this.CUSTOMHUE:0,40+60*f,5+60*f+15*f*f);
			}
		}
		if(this.ALGORITHM=="hexagons"){
			for(y=0;y<grid.length-1;y++){
				for(x=y%2==0?0:1;x<grid[0].length-3;x+=2){
					triangles.push(new Triangle(grid[y][x],grid[y+1][x+1],grid[y][x+2],this.GRADIENTMODE));
					triangles.push(new Triangle(grid[y+1][x+1],grid[y+1][x+3],grid[y][x+2],this.GRADIENTMODE));
				}
			}
		}else if(this.ALGORITHM=="mesh"){
			for(y=0;y<grid.length-1;y++){
                for(x=0;x<grid[0].length-2;x+=2){
                    triangles.push(new Triangle(grid[y][x],grid[y+1][x],grid[y][x+2],this.GRADIENTMODE));
                    triangles.push(new Triangle(grid[y+1][x],grid[y+1][x+2],grid[y][x+2],this.GRADIENTMODE));
                }
            }
		}
		this.triangles=triangles;
	},
	draw:function(){
		if(!(document.getElementById(this.targetId))){
			this.destroy();
			return;
		}
		var canvas=document.getElementById(this.targetId);
		if(this.PAUSED||!isVisible(canvas)) return;
		if(this.prevW!=canvas.clientWidth||this.prevH!=canvas.clientHeight) this.init();
		var time=new Date().getTime()/1000.0;
		var day=this.CUSTOMHUE!=undefined?0:((time/this.HUEPERIOD)%1);
		time*=this.SPEED;
		var w,h;
		if(canvas.width<canvas.height){
			w=canvas.width;
			h=w;
		}else{
			h=canvas.height;
			w=h;
		}
		var ctx=canvas.getContext("2d");
		this.triangles.forEach(function(t){
			t.p1.cX=(this.SX/this.DAMPEN)*Math.cos(time*t.p1.tmul)+t.p1.x;
			t.p1.cY=(this.SY/this.DAMPEN)*Math.sin(time*t.p1.tmul)+t.p1.y;
			t.p2.cX=(this.SX/this.DAMPEN)*Math.cos(time*t.p2.tmul)+t.p2.x;
			t.p2.cY=(this.SY/this.DAMPEN)*Math.sin(time*t.p2.tmul)+t.p2.y;
			t.p3.cX=(this.SX/this.DAMPEN)*Math.cos(time*t.p3.tmul)+t.p3.x;
			t.p3.cY=(this.SY/this.DAMPEN)*Math.sin(time*t.p3.tmul)+t.p3.y;
		}.bind(this));
		this.triangles.forEach(function(t){
			var hue=(t.h+(day*360))%360, sat=t.s*this.SATURATION, luma=t.l*this.LIGHTNESS;
			ctx.fillStyle="hsl("+hue+","+(sat<0?0:sat>100?100:sat)+"%,"+(luma<0?0:luma>100?100:luma)+"%)";
			ctx.beginPath();
			ctx.moveTo(t.p1.cX*w,t.p1.cY*h);
			ctx.lineTo(t.p2.cX*w,t.p2.cY*h);
			ctx.lineTo(t.p3.cX*w,t.p3.cY*h);
			ctx.fill();
		}.bind(this));
		if(this.OUTLINE){
			ctx.strokeStyle=this.OUTLINECOLOR;
			ctx.lineWidth=this.OUTLINETHICKNESS;
			this.triangles.forEach(function(t){
				ctx.beginPath();
				ctx.moveTo(t.p1.cX*w,t.p1.cY*h);
				ctx.lineTo(t.p2.cX*w,t.p2.cY*h);
				ctx.lineTo(t.p3.cX*w,t.p3.cY*h);
				ctx.stroke();
			}.bind(this));
		}
		this.prevW=canvas.clientWidth;
		this.prevH=canvas.clientHeight;
	},
	destroy:function(targetId){
		if(targetId){
			if(runningInstances[targetId])runningInstances[targetId].destroy();
		}else{
			clearInterval(this.interval);
			runningInstances[this.targetId]=undefined;
		}
	},
	pause:function(){
		this.PAUSE=true;
	},
	resume:function(){
		this.PAUSE=false;
	}
}

MuhTriangles.destroy=MuhTriangles.prototype.destroy;