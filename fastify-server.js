/*
Drew Lesh
CIT 281 - Lab 5
*/

// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
const {getStudentById, getStudents, addToStudents, students} = require('./lab-modules.js');
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax

//return all students
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getStudents());
});
fastify.post("/cit/student", (request, reply) => {
    const {first, last} = request.body;
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(addToStudents(first, last));
});

// return single student if it exists
fastify.get("/cit/student/:id", (request, reply) => {
    const {id} = request.params;
    for (student of students) {
      if (student.id === parseInt(id)) {
        reply
          .header("Content-Type", "application/json; charset=utf-8")
          .code(404)
          .send(getStudentById(id));
          return;
      } 
    }
      reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({error: "Id not found"});
        
  });

// unmatched route handle
fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({error: "Route Not Found"});
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

