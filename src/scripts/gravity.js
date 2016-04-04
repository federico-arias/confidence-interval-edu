var Box2D = require('box2dweb');

function Gravity(domElem) {
var   b2Vec2 = Box2D.Common.Math.b2Vec2
, b2BodyDef = Box2D.Dynamics.b2BodyDef
, b2Body = Box2D.Dynamics.b2Body
, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
, b2Fixture = Box2D.Dynamics.b2Fixture
, b2World = Box2D.Dynamics.b2World
, b2MassData = Box2D.Collision.Shapes.b2MassData
, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
, b2DebugDraw = Box2D.Dynamics.b2DebugDraw; 

this.world = new b2World(
     new b2Vec2(0, -10)    //gravity
  ,  true                 //allow sleep
);

}

Gravity.prototype.animate = function(domList) {
   var a = this.world.GetBodyList();

   while (typeof a !== 'undefined' && a !== null ) {
       a.SetLinearVelocity(new b2Vec2(0, a.GetLinearVelocity().y));
       if (a.GetUserData() != null) {
           css[a.GetUserData()].setAttribute('cy', 600 - a.GetPosition().y);
           css[a.GetUserData()].setAttribute('cx', a.GetPosition().x);
       }
       a = a.m_next; 
   };

   world.Step(1/25,10,10);

   window.requestAnimationFrame(animate);
};

}
