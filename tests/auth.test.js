module.exports = (app, request) => {
  describe('Auth', () => {

    it('register endpoint generates user with correct properties', async done => {

      request
      .post('/auth/register')
      .send({
        username: "user",
        email: "user@root.com",
        firstName: "user",
        lastName: "root",
        password: "testpassword",
        verifyPassword: "testpassword"
      })
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err);

        expect(res.body.password)
          .toBeUndefined()

        done();
      })
    });

    it('login endpoint returns valid token for valid username and password', async done => {

      request
      .post('/auth/login')
      .send({
        username: "user",
        password: "testpassword"
      })
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err);

        expect(res.body.token)
          .toHaveLength(64)

        done();
      })
    });

    it('token from login endpoint is valid', done => {
      request
      .post('/auth/login')
      .send({
        username: "user",
        password: "testpassword"
      })
      .then( res => {

        // Attempt to hit a route with the new token
        request
        .get('/user/1')
        .set('Authorization', `Bearer ${res.body.token}`)
        .expect(200)
        .then(() => {
          done()
        })
      })
    });
  })
}
