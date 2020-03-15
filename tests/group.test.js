module.exports = (app, request) => {
  describe('Group', () => {
    let group = null
    let token = null
    let user = null

    beforeAll((done) => {
      request
      .post('/auth/register')
      .send({
        username: "groupuser",
        email: "group@root.com",
        firstName: "group",
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
          username: "user",
          password: "testpassword"
        })
        .end( (login_err, login_res) => {
          if (login_err) return done(login_err)
          token = login_res.body.token
          done()
        })

      })
    })

    it('can create new group', done => {
      request
      .post('/group/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "New User Group"
      })
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err);
        group = res.body
        done()
      })
    })

    it('can update group', done => {

      request
      .post(`/group/update/${ group.id }`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Updated name"
      })
      .end( (err, res) => {
        if (err) return done(err)
        done()
      })

    })

    it('can assign group to user', done => {
      request
      .post(`/group/${ group.id }/add/${ user.id }`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err)
        done()
      })
    })

    it('can list group members', done => {
      request
      .get(`/group/${ group.id }`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err)
        done()
      })
    })

    it('can remove user from group', done => {
      request
      .post(`/group/${ group.id }/remove/${ user.id }`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err)
        done()
      })
    })

    it('can delete group', done => {
      request
      .post(`/group/delete/${ group.id }`)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200)
      .end( (err, res) => {
        if (err) return done(err)
        done()
      })
    })


  })
}
