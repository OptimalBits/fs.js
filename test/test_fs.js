define(['fs'], function(FSFactory) {

  var text1 = "Lorem Ipsum",
    text2 = "dolor sit amet",
    text3 = "",

    url1 = 'http://localhost:8080/fixtures/lorem.txt',
    url2 = 'http://localhost:8080/fixtures/ipsum.txt',
    url3 = 'http://localhost:8080/fixtures/long.txt',
    url4 = 'http://localhost:8080/fixtures/asdf.txt',
    url5 = 'http://localhost:8080/fixtures/qwer.txt',
    url6 = 'http://localhost:8080/fixtures/dsgbv.txt';

  for (var i = 0; i < 1000; i++) {
    text3 += "a";
  }

  describe('File', function() {
    var fs;
    
    it('Create filesystem', function(done) {
      FSFactory(1024 * 1024, 'filetest', function(err, filesystem) {
        expect(err).to.be(null);
        expect(filesystem).to.be.an(Object);
        fs = filesystem;
        done();
      });
    });

    it('Write file test.txt', function(done) {
      fs.writeFile("test.txt", text1, function(err, fileEntry) {
        expect(err).to.be(null);
        expect(fileEntry).to.be.an(Object);
        done();
      });
    });

    it('Read file test.txt as ArrayBuffer', function(done) {
      fs.readFile("test.txt", function(err, data) {
        expect(err).to.be(null);
        expect(data).to.be.an(ArrayBuffer);
        done();
      });
    });

    it('Read file test.txt as text', function(done) {
      fs.readFile("test.txt", 'UTF-8', function(err, text) {
        expect(err).to.be(null);
        expect(text).to.be.a('string');
        done();
      });
    });
    
    
    it('Rename file test.txt to renamed.txte', function(done) {
      fs.rename("test.txt", "renamed.txt", function(err) {
        expect(err).to.not.be.ok();
        done();
      });
    });
  
    it('Remove file renamed.txt', function(done) {
      fs.remove("renamed.txt", function(err, success) {
        expect(err).to.be(null);
        expect(success).to.be(true);
        done();
      });
    });

    it('Try to read removed file renamed.txt', function(done) {
      fs.read("renamed.txt", function(err, text) {
        expect(err.code).to.be(FileError.NOT_FOUND_ERR);
        expect(text).to.be(undefined);
        done();
      });
    });

    it('Write persistent file test.txt', function(done) {
      fs.writeFile("test.txt", text1, function(err, fileEntry) {
        expect(err).to.be(null);
        expect(fileEntry).to.be.an(Object);
        done();
      });
    });
    
    it('Check stats of written file', function(done){
      fs.stats('test.txt', function(err, stats){
        expect(err).to.not.be.ok();
        expect(stats).to.be.an(Object);
        expect(stats.isFile).to.be.a(Function);
        expect(stats.isDirectory).to.be.a(Function);
        expect(stats.isFile()).to.be.ok();
        expect(stats.isDirectory()).to.not.be.ok();
        done();
      });
    });
    
    it('Create a directory', function(done){
      fs.mkdir('/testdir', function(err){
        expect(err).to.not.be.ok();
        fs.exists('/testdir', function(exists){
          expect(exists).to.be(true);
          done();
        })
      });
    });
    
    it('Create a subdirectory', function(done){
      fs.mkdir('/testdir/subdir', function(err){
        expect(err).to.not.be.ok();
        fs.exists('/testdir/subdir', function(exists){
          expect(exists).to.be(true);
          done();
        })
      });
    });
    
    it('Create a directory in a deep path', function(done){
      fs.mkpath('/a/b/c/d', function(err){
        expect(err).to.not.be.ok();
        fs.exists('/a/b/c/d', function(exists){
          expect(exists).to.be(true);
          fs.exists('/a/b/c/e', function(exists){
            expect(exists).to.be(false);
            done();
          });  
        })
        done();
      });
    });
    
    it('Remove a subdirectory', function(done){
      fs.rmdir('/testdir/subdir', function(err){
        expect(err).to.not.be.ok();
        fs.exists('/testdir/subdir', function(exists){
          expect(exists).to.be(false);
          fs.exists('/testdir', function(exists){
            expect(exists).to.be(true);
            done();
          });
        }); 
      })
    });
    
    it('Remove a directory', function(done){
      fs.rmdir('/testdir', function(err){
        expect(err).to.not.be.ok();
        fs.exists('/testdir', function(exists){
          expect(exists).to.be(false);
          done();
        }); 
      })
    });
    
    it('Remove a subdirectory in a deep path', function(done){
      fs.rmdir('/a/b/c/d', function(err){
        expect(err).to.not.be.ok();
        fs.exists('/a/b/c/d', function(exists){
          expect(exists).to.be(false);
          fs.exists('/a/b/c', function(exists){
            expect(exists).to.be(true);
            done();
          });
        }); 
      })
    });
    
    it('Read root entries', function(done){
      fs.readdir('/a', function(err, entries){
        console.log(entries);
        expect(err).to.not.be.ok();
        expect(entries).to.have.property('length');
        expect(entries.length).to.be(1);
        done()
      });
    });

    it('Remove a deep path', function(done){
      fs.rmdir('/a', function(err){
        expect(err).to.not.be.ok();
        fs.exists('/a', function(exists){
          expect(exists).to.be(false);
          fs.exists('/a/b', function(exists){
            expect(exists).to.be(false);
            fs.exists('/a/b/c', function(exists){
              expect(exists).to.be(false);
              done();
            });
          });
        }); 
      })
    });
    
    it('Read root entries', function(done){
      fs.readdir('/', function(err, entries){
        expect(err).to.not.be.ok();
        expect(entries).to.have.property('length');
        expect(entries.length).to.be(1);
        done()
      });
    });
    
    it('Open existing filesystem', function(done) {
      FSFactory(1024 * 1024, 'filetest', function(err, filesystem) {
        expect(err).to.be(null);
        expect(filesystem).to.be.an(Object);
        fs = filesystem;
        done();
      });
    });

    it('Write file test2.txt', function(done) {
      fs.writeFile("test2.txt", text2, function(err, fileEntry) {
        expect(err).to.be(null);
        expect(fileEntry).to.be.an(Object);
        done();
      });
    });

    it('Read file test.txt', function(done) {
      fs.readFile("test.txt", 'utf-8', function(err, text) {
        expect(err).to.be(null);
        expect(text).to.be(text);
        done();
      });
    });

    it('Read file test2.txt', function(done) {
      fs.readFile("test2.txt", 'utf-8', function(err, text) {
        expect(err).to.be(null);
        expect(text).to.be(text2);
        done();
      });
    });

    it('Append text to test2.txt', function(done) {
      fs.appendFile("test2.txt", text1, function(err, fileEntry) {
        expect(err).to.be(null);
        expect(fileEntry).to.be.an(Object);
        done();
      });
    });

    it('Read file test2.txt', function(done) {
      fs.read("test2.txt", 'utf-8', function(err, text) {
        expect(err).to.be(null);
        expect(text).to.be(text2 + text1);
        done();
      });
    });

    it('Wipe', function(done) {
      fs.wipe(function(err) {
        expect(err).to.not.be.ok();
        done();
      });
    });

    it('Try to read removed file test.txt', function(done) {
      fs.read("test.txt", function(err, text) {
        expect(err).to.be.ok();
        expect(err.code).to.be(FileError.NOT_FOUND_ERR);
        expect(text).to.be(undefined);
        done();
      });
    });

    it('Try to read removed file test2.txt', function(done) {
      fs.read("test2.txt", function(err, text) {
        expect(err).to.be.ok();
        expect(err.code).to.be(FileError.NOT_FOUND_ERR);
        expect(text).to.be(undefined);
        done();
      });
    });
  });
});

