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
    
    it('Created filesystem', function(done) {
      FSFactory(1024 * 1024, 'filetest', function(err, filesystem) {
        expect(err).to.be(null);
        expect(filesystem).to.be.an(Object);
        fs = filesystem;
        done();
      });
    });

    it('Write file test.txt', function(done) {
      var bb = new WebKitBlobBuilder();
      bb.append(text1);
      var blob = bb.getBlob('text/plain');

      fs.write("test.txt", blob, function(err, fileEntry) {
        expect(err).to.be(null);
        expect(fileEntry).to.be.an(Object);
        done();
      });
    });

    it('Read file test.txt', function(done) {
      fs.read("test.txt", function(err, text) {
        expect(err).to.be(null);
        expect(text).to.be(text);
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
      var bb = new WebKitBlobBuilder();
      bb.append(text1);
      var blob = bb.getBlob('text/plain');

      fs.write("test.txt", blob, function(err, fileEntry) {
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
  
    it('Create new filesystem', function(done) {
      FSFactory(1024 * 1024, 'filetest', function(err, filesystem) {
        expect(err).to.be(null);
        expect(filesystem).to.be.an(Object);

        fs = filesystem;
        done();
      });
    });

    it('Write file test2.txt', function(done) {
      var bb = new WebKitBlobBuilder();
      bb.append(text2);
      var blob = bb.getBlob('text/plain');

      fs.write("test2.txt", blob, function(err, fileEntry) {
        expect(err).to.be(null);
        expect(fileEntry).to.be.an(Object);
        done();
      });
    });

    it('Read file test.txt', function(done) {
      fs.read("test.txt", function(err, text) {
        expect(err).to.be(null);
        expect(text).to.be(text);
        done();
      });
    });

    it('Read file test2.txt', function(done) {
      fs.read("test2.txt", function(err, text) {
        expect(err).to.be(null);
        expect(text).to.be(text2);
        done();
      });
    });

    it('Append text to test2.txt', function(done) {
      var bb = new WebKitBlobBuilder();
      bb.append(text1);
      var blob = bb.getBlob('text/plain');
      fs.append("test2.txt", blob, function(err, fileEntry) {
        expect(err).to.be(null);
        expect(fileEntry).to.be.an(Object);
        done();
      });
    });

    it('Read file test2.txt', function(done) {
      fs.read("test2.txt", function(err, text) {
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

