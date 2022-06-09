export default `
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform sampler2D iChannel0;
uniform float rainAmount;

#define S(a, b, t) smoothstep(a, b, t)
//#define CHEAP_NORMALS
#define USE_POST_PROCESSING


vec3 N13(float p) {
    //  from DAVE HOSKINS
   vec3 p3 = fract(vec3(p) * vec3(.1031,.11369,.13787));
   p3 += dot(p3, p3.yzx + 19.19);
   return fract(vec3((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y, (p3.y+p3.z)*p3.x));
}

vec4 N14(float t) {
	return fract(sin(t*vec4(123., 1024., 1456., 264.))*vec4(6547., 345., 8799., 1564.));
}
float N(float t) {
    return fract(sin(t*12345.564)*7658.76);
}

float Saw(float b, float t) {
	return S(0., b, t)*S(1., b, t);
}


vec2 DropLayer2(vec2 uv, float t) {
    vec2 UV = uv;
    
    uv.y += t*0.75;
    vec2 a = vec2(6., 1.);
    vec2 grid = a*2.;
    vec2 id = floor(uv*grid);
    
    float colShift = N(id.x); 
    uv.y += colShift;
    
    id = floor(uv*grid);
    vec3 n = N13(id.x*35.2+id.y*2376.1);
    vec2 st = fract(uv*grid)-vec2(.5, 0);
    
    float x = n.x-.5;
    
    float y = UV.y*20.;
    float wiggle = sin(y+sin(y));
    x += wiggle*(.5-abs(x))*(n.z-.5);
    x *= .7;
    float ti = fract(t+n.z);
    y = (Saw(.85, ti)-.5)*.9+.5;
    vec2 p = vec2(x, y);
    
    float d = length((st-p)*a.yx);
    
    float mainDrop = S(.4, .0, d);
    
    float r = sqrt(S(1., y, st.y));
    float cd = abs(st.x-x);
    float trail = S(.23*r, .15*r*r, cd);
    float trailFront = S(-.02, .02, st.y-y);
    trail *= trailFront*r*r;
    
    y = UV.y;
    float trail2 = S(.2*r, .0, cd);
    float droplets = max(0., (sin(y*(1.-y)*120.)-st.y))*trail2*trailFront*n.z;
    y = fract(y*10.)+(st.y-.5);
    float dd = length(st-vec2(x, y));
    droplets = S(.3, 0., dd);
    float m = mainDrop+droplets*r*trailFront;
    
    //m += st.x>a.y*.45 || st.y>a.x*.165 ? 1.2 : 0.;
    return vec2(m, trail);
}

float StaticDrops(vec2 uv, float t) {
	uv *= 40.;
    
    vec2 id = floor(uv);
    uv = fract(uv)-.5;
    vec3 n = N13(id.x*107.45+id.y*3543.654);
    vec2 p = (n.xy-.5)*.7;
    float d = length(uv-p);
    
    float fade = Saw(.025, fract(t+n.z));
    float c = S(.3, 0., d)*fract(n.z*10.)*fade;
    return c;
}

vec2 Drops(vec2 uv, float t, float l0, float l1, float l2) {
    float s = StaticDrops(uv, t)*l0; 
    vec2 m1 = DropLayer2(uv, t)*l1;
    vec2 m2 = DropLayer2(uv*1.85, t)*l2;
    
    float c = s+m1.x+m2.x;
    c = S(.3, 1., c);
    
    return vec2(c, max(m1.y*l0, m2.y*l1));
}

void main( )
{
	vec2 uv = (gl_FragCoord.xy-.5*iResolution.xy) / iResolution.y;
    vec2 UV = gl_FragCoord.xy/iResolution.xy;
    vec2 M = iMouse.xy/iResolution.xy;
    M.y = 1.0 - M.y;
    float T = iTime;
    
    float t = T*.2;    
    
    vec3 col;
    float maxBlur = mix(3., 6., rainAmount);
    float minBlur = 0.0;
        
    float story = 0.;
    float heart = 0.;
    float zoom = T > 5.0 * 3.14 ? 1.0 : -cos(T*.2);
    uv *= .7+zoom*.3;
    UV = (UV-.68)*(.65+zoom*.1)+0.55;
    UV.y *= 0.95;
    if(rainAmount < 0.001){
        col = texture2D(iChannel0, UV).rgb; 
    }
    else {
        float staticDrops = S(-.5, 1., rainAmount)*2.;
        float layer1 = S(.25, .75, rainAmount);
        float layer2 = S(.0, .5, rainAmount);
        
        
        vec2 c = Drops(uv, t, staticDrops, layer1, layer2);
        #ifdef CHEAP_NORMALS
            vec2 n = vec2(dFdx(c.x), dFdy(c.x));// cheap normals (3x cheaper, but 2 times shittier ;))
        #else
            vec2 e = vec2(.001, 0.);
            float cx = Drops(uv+e, t, staticDrops, layer1, layer2).x;
            float cy = Drops(uv+e.yx, t, staticDrops, layer1, layer2).x;
            vec2 n = vec2(cx-c.x, cy-c.x);		// expensive normals
        #endif
        float focus = mix(maxBlur-c.y, minBlur, S(.1, .2, c.x));
        col = texture2DLodEXT(iChannel0, UV+n, focus).rgb;
    }  

    
    #ifdef USE_POST_PROCESSING
    t = (T+3.)*.5;										// make time sync with first lightnoing
    float colFade = sin(t*.2)*.5+.5+story;
    col *= mix(vec3(1.), vec3(.8, .9, 1.3), colFade);	// subtle color shift
    float fade = S(0., 10., T);							// fade in at the start
    col *= 1.-dot(UV-=.5, UV);							// vignette   									
    
    col *= fade;										// composite start and end fade
    #endif
    
    gl_FragColor = vec4(col, 1.);
}`;
