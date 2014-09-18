module.exports = function(server){
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function(socket) {
        socket.on('send-file', function(name, buffer) {
            var fs = require('fs');

            //path to store uploaded files (NOTE: presumed you have created the folders)
            var fileName = './chat/uploads/' /*+ Math.random()*/ + name;

            var wstream = fs.createWriteStream(fileName, {flags : 'a', encoding : 'binary'});

            var parts = 5;
            var one_part = Math.floor(buffer.length/parts);

            function recursiveWrite(stream, part, all_parts, number, all_buffer){
                if(number < all_parts -1){
                    stream.write(all_buffer.substr(number*part, part*(number+1)), 'binary', function(){
                        console.log('File part saved successfully!' + i);
                    });
                }else{
                    stream.write(all_buffer.substr(all_parts*part), 'binary', function(){
                        console.log('File saved successfully!');
                    });
                    stream.close();
                }
                stream.once("drain", recursiveWrite(stream, part, all_parts, number + 1, all_buffer));
            }

            recursiveWrite(wstream, one_part, parts, 0, buffer);

            /*wstream.write(buffer.substr(parts*one_part), 'binary', function(){
                console.log('File saved successfully!');
            });*/
            /*fs.open(fileName, 'a', 0755, function(err, fd) {
                if (err) throw err;
                var parts = 5;
                var custom_buffer = new Buffer(buffer, 'binary');
                var one_part = Math.floor(custom_buffer.length/parts);
                for(i = 0; i < parts; i++){
                    fs.write(fd, custom_buffer, i*one_part, one_part, null, function(err, written, buff) {
                        fs.close(fd, function() {
                            console.log('File part saved successful!');
                        });
                    })
                }
                var last = custom_buffer.length - parts*one_part;
                fs.write(fd, custom_buffer, parts*one_part, last, null, function(err, written, buff) {
                    fs.close(fd, function() {
                        console.log('File saved successful!');
                    });
                })
            });*/

        });
    });
};

