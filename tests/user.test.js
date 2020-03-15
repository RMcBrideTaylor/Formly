module.exports = (app, request) => {

  describe('User', () => {
    let user = null
    let token = null

    beforeAll(done => {
      request
      .post('/auth/register')
      .send({
        username: "testuser",
        email: "test@root.com",
        firstName: "test",
        lastName: "user",
        password: "testpassword",
        verifyPassword: "testpassword"
      })
      .expect(200)
      .end( (err, res) => {

        user = res.body

        request
        .post('/auth/login')
        .send({
          username: "testuser",
          password: "testpassword"
        })
        .end( (login_err, login_res) => {
          if (login_err) return done(login_err)
          token = login_res.body.token
          done()
        })

      })
    })

    it('can update user information', done => {
      request
      .post(`/user/update/${ user.id }`)
      .send({...user, ...{ firstName: 'updatedtestuser'}})
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err);
        done()
      })
    })

    it('can get information about user', done => {
      request
      .get(`/user/${ user.id }`)
      .expect(200)
      .set('Authorization', `Bearer ${token}`)
      .end( (err, res) => {
        if (err) return done(err);
        done()
      })
    })

    it('can delete user', done => {
      request
      .post(`/user/delete/${ user.id }`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err);
        done()
      })
    })

  })
}
