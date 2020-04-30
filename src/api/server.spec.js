const request = require("supertest");

const server = require("./server.js");
const db = require('../database/dbConfig');

const recipe = {
	"title": "Fancy Scrambled Eggs",
  "source": "The Incredible eggs",
  "ingredients": "4. large eggs, 1/4 cup,\tmilk, pinch\tsalt, pinch\tpepper, 2 tsp.\tbutter",
  "instructions": "1. BEAT eggs, milk, salt and pepper in medium bowl until blended. 2. HEAT butter in large nonstick skillet over medium heat until hot. POUR in egg mixture. As eggs begin to set, gently PULL the eggs across the pan with a spatula, forming large soft curds. 3. CONTINUE cooking—pulling, lifting and folding eggs—until thickened and no visible liquid egg remains. Do not stir constantly. REMOVE from heat. SERVE immediately.",
  "category": "eggs"
};

describe("server", function () {
  it("runs the tests", function () {
    expect(true).toBe(true);
  });

  describe("GET /", function () {
    it("should return 200 OK", function () {
      // make a GET request to /
      return request(server)
        .get("/")
        .then((res) => {
          // check that the status code is 200
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON", function () {
      // make a GET request to /
      return request(server)
        .get("/")
        .then((res) => {
          // check that the status code is 200
          expect(res.type).toMatch(/json/i);
        });
    });

    it("get correct res", function () {
      // make a GET request to /
      return request(server)
        .get("/")
        .then((res) => {
          // check that the status code is 200
          expect(res.body.api).toBe("up");
        });
    });
  });
});

describe("POST /api/register", () => {
  let res;
  beforeAll(async () => {
    await db('users').truncate();
    res = await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
  });

  it('return 201 on success', async () => {
    expect(res.status).toBe(201);
  });

  it('return user with correct id', async () => {
    expect(res.body.id).toBe(1);
  });

  it('return user with correct username', async () => {
    expect(res.body.username).toBe('test');
  });

  it('return user with correct email', async () => {
    expect(res.body.email).toBe('test@email.com');
  });

  it('return user with hashed password', async () => {
    expect(res.body.password).not.toBe('password');
  });
});

describe("POST /api/login", () => {
  let res;
  beforeAll(async () => {
    await db('users').truncate();
    await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
    res = await request(server).post('/api/login').send({ username: 'test', password: 'password' });
  });

  it('successful login', async () => {
    expect(res.status).toBe(200);
  });
  it('returned id', async () => {
    expect(res.body.id).toBe(1);
  });

  it('returned token', async () => {
    expect(res.body).toHaveProperty('token');
  });

  it('unsuccessful login', async () => {
    const badRes = await request(server).post('/api/login').send({ username: 'test', password: 'passwod' });
    expect(badRes.status).toBe(401);
  });
});

describe("Recipe", () => {
  describe("POST /api/:id/recipe", () => {
    let res;
    let token;
    beforeAll(async () => {
      await db('users').truncate();
      await db('recipes').truncate();
      await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
      res = await request(server).post('/api/login').send({ username: 'test', password: 'password' });
      token = res.body.token;
      res = await request(server).post('/api/1/recipe').send(recipe).set({ 'Authorization': token });
    });

    it('status is 200', async () => {
      expect(res.status).toBe(201);
    });

    it ('return recipe index', async () => {
      expect(res.body).toBe(1);
    });

    it ('incorrect recipe post', async () => {
      res = await request(server).post('/api/1/recipe').send();
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/:id/recipe", () => {
    let res;
    let token;
    beforeAll(async () => {
      await db('users').truncate();
      await db('recipes').truncate();
      await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
      res = await request(server).post('/api/login').send({ username: 'test', password: 'password' });
      token = res.body.token;
      await request(server).post('/api/1/recipe').send(recipe).set({ 'Authorization': token });
      res = await request(server).get('/api/1/recipe').set({ 'Authorization': token });
    });

  it('status 200', async () => {
      expect(res.status).toBe(200);
    }); 

    it('has recipe', async () => {
      expect(res.body[0]).toBeTruthy();
    });

    it('no recipes', async () => {
      res = await request(server).get('/api/2/recipe').set({ 'Authorization': token });
      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/:id/recipe/title", () => {
    let res;
    let token;
    beforeAll(async () => {
      await db('users').truncate();
      await db('recipes').truncate();
      await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
      res = await request(server).post('/api/login').send({ username: 'test', password: 'password' });
      token = res.body.token;
      await request(server).post('/api/1/recipe').send(recipe).set({ 'Authorization': token });
      res = await request(server).get('/api/1/recipe/title?title=Fancy Scrambled Eggs').set({ 'Authorization': token });
    });

    it('finds recipe', async () => {
      expect(res.body[0]).toBeTruthy();
    }); 

    it('does not find recipe', async () => {
      res = await request(server).get('/api/1/recipe/title?title=Scrambled Eggs').set({ 'Authorization': token });
      expect(res.body[0]).toBeFalsy();
    });
  });

  describe("GET /api/:id/category", () => {
    let res;
    let token;
    beforeAll(async () => {
      await db('users').truncate();
      await db('recipes').truncate();
      await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
      res = await request(server).post('/api/login').send({ username: 'test', password: 'password' });
      token = res.body.token;
      await request(server).post('/api/1/recipe').send(recipe).set({ 'Authorization': token });
      res = await request(server).get('/api/1/recipe/category?category=eggs').set({ 'Authorization': token });
    });

    it('finds recipe', async () => {
      expect(res.body[0]).toBeTruthy();
    }); 

    it('does not find recipe', async () => {
      res = await request(server).get('/api/1/recipe/category?category=chicken').set({ 'Authorization': token });
      expect(res.body[0]).toBeFalsy();
    });
  });

  describe("PUT /api/:id/recipe/:recipe_id", () => {
    let res;
    let token;
    beforeAll(async () => {
      await db('users').truncate();
      await db('recipes').truncate();
      await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
      res = await request(server).post('/api/login').send({ username: 'test', password: 'password' });
      token = res.body.token;
      await request(server).post('/api/1/recipe').send(recipe).set({ 'Authorization': token });
      res = await request(server).put('/api/1/recipe/1').send({...recipe, title: 'Special Eggs'}).set({ 'Authorization': token });
    });

    it('one record updated', async () => {
      expect(res.body.updated).toBe(1);
    }); 

    it('no records updated', async () => {
      res = await request(server).put('/api/1/recipe/1000').send({...recipe, title: 'Special Eggs'}).set({ 'Authorization': token });
      expect(res.status).toBe(404);
    }); 
  });

  describe("DELETE /api/:id/recipe/:recipe_id", () => {
    let res;
    let token;
    beforeAll(async () => {
      await db('users').truncate();
      await db('recipes').truncate();
      await request(server).post('/api/register').send({ username: 'test', password: 'password', email: 'test@email.com' });
      res = await request(server).post('/api/login').send({ username: 'test', password: 'password' });
      token = res.body.token;
      await request(server).post('/api/1/recipe').send(recipe).set({ 'Authorization': token });
      res = await request(server).delete('/api/1/recipe/1').set({ 'Authorization': token });
    });

    it('delete 1 recipe', async () => {
      expect(res.body.removed).toBe(1);
    }); 

    it('no recipe deleted', async () => {
      res = await request(server).delete('/api/1/recipe/1').set({ 'Authorization': token });
      expect(res.status).toBe(404);
    });
  });
});
