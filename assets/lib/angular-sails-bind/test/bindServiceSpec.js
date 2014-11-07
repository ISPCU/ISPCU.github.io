/**
 * Created by dpamio on 29/05/14.
 */
var app;
describe('the angular sailsjs bind service', function () {
    beforeEach(function () {
        //setup the driver angular app.
        app = angular.module("testApp", ['ngSailsBind']);
        module('testApp');
        inject(function (_$sailsBind_) {
            $sailsBind = _$sailsBind_;
        });
        inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        });

        inject(function($injector) {
            $timeout = $injector.get('$timeout');
            //$timeout.flush();
        });
        inject(function (_$q_) {
            $q = _$q_;
        });
    });

    it('should have a bind function', function () {
        expect(angular.isFunction($sailsBind.bind)).to.be.true;
    });

    describe('the bind function', function () {
        var modelName = "myModelItem",
            defaultData;

        beforeEach(function () {
            defaultData = [
                {'id': '1', 'modelAttribute1': "string", 'modelAttribute2': 'another string'},
                {'id': '2', 'modelAttribute1': "4", 'modelAttribute2': '10'}
            ];

            //Mock the initial "get all"
            io.socket.when.get["/" + modelName] = {return: defaultData};

            //Do the binding.
            $sailsBind.bind(modelName, $rootScope);
            $timeout.flush();
        });

        it('should create a model named ' + modelName, function () {
            expect($rootScope[modelName + 's']).to.be.an("array");
        });
        it('should load the model with the contents from the backend', function () {
            expect(io.socket.requestCalled.url).to.equal("/" + modelName);

            expect($rootScope[modelName + 's']).to.deep.equal(defaultData);
        });

        it('should update the model when a new element is ADDED in the backend', function () {
            //Simulate an "on-created" event sent from the server for this model
            io.socket.triggerOn(modelName, 'created', {'id': '3', 'modelAttribute1': "new", 'modelAttribute2': 'data'});
            $timeout.flush();
            expect($rootScope[modelName + 's']).to.have.length(3);
        });

        it('should update the model when an  element is DELETED in the backend', function () {
            var removedData = {'id': 2};

            //Mock server so it doesn't return item #2 anymore.
            io.socket.when.get["/" + modelName] =
            { return: {'id': '1', 'modelAttribute1': "string", 'modelAttribute2': 'another string'}
            };

            //Mock server to find nothing when finding item #2,
            io.socket.when.get["/" + modelName + "?id=" + removedData.id ] = {return: {error: "id not found"}};

            //Simulate an "on-delete" event sent from the server for this model
            io.socket.triggerOn(modelName, 'destroyed', removedData, removedData.id);
            $timeout.flush();

            expect($rootScope[modelName + 's']).to.have.length(1);
        });

        it('should update the model when an is MODIFIED in the backend', function () {
            var modifiedItem = {'id': '2', 'modelAttribute1': "4", 'modelAttribute2': 'not10'};

            //Simulate someone has modified item 2 in the database.
            io.socket.triggerOn(modelName, 'updated', modifiedItem, modifiedItem.id);
            $timeout.flush();

            expect($rootScope[modelName + 's'][1]).to.deep.equal(modifiedItem);
        });

        it('should persist in the backend when a new element is ADDED in the client', function () {
            var newElementCreatedInClient = {name: "newElement"},
                newElementAsReturnedByBackend = {id: 3, name: "newElement"};

            //Mock the server to accept the creation and return the ID of the newly created item.
            io.socket.when.put["/" + modelName + "/create/"] = {return: newElementAsReturnedByBackend};

            //Mock the server to return the new item after it Setup so that the backend
            //     returns the newly created item with the id.
            io.socket.when.get["/" + modelName + "/" + newElementAsReturnedByBackend.id] = {
                return: newElementAsReturnedByBackend
            };

            //Modify the model
            $rootScope[modelName + 's'].push(newElementCreatedInClient);
            //$timeout.flush();
            $rootScope.$apply();
            $timeout.flush();

            //Check that things were sent to the server as expected
            expect(io.socket.putCalled.data).to.deep.equal(newElementCreatedInClient);
            expect(io.socket.putCalled.url).to.equal("/" + modelName + "/create/");
            expect($rootScope[modelName + 's'][2]).to.deep.equal(newElementAsReturnedByBackend);
        });

        it('should persist in the backend when an element is REMOVED in the client', function () {
            var removedData = $rootScope[modelName + 's'].pop();

            //Setup backend to simulate the item wasn't removed there yet.
            io.socket.when.get["/" + modelName + "?id=" + removedData.id] = {return: removedData};

            //Setup the socket mock to return the id of the deleted item
            io.socket.when.delete["/" + modelName + "/destroy/" + removedData.id] = {return: removedData};

            //Modify the model (actually "apply" and "flush" the deletion).
            $rootScope.$apply();
            $timeout.flush();

            //Check that things were sent to the server as expected
            expect(io.socket.deleteCalled.url).to.equal("/" + modelName + "/destroy/" + removedData.id);
        });

        it('should persist in the backend when a new element is MODIFIED in the client', function () {
            var dataToModify = $rootScope[modelName + 's'][1];

            //Setup backend to simulate the item wasn't removed there yet.
            //io.socket.when.get["/" + modelName + "?id=" + removedData.id] = {return: removedData};

            //Setup the socket mock to return the id of the deleted item
            //io.socket.when.delete["/" + modelName + "/destroy/" + removedData.id] = {return: removedData};

            //Modify the model (actually "apply" and "flush" the deletion).
            $rootScope[modelName + 's'][1].modelAttribute1 = "another string";
            $rootScope.$apply();

            //Check that things were sent to the server as expected
            expect(io.socket.postCalled.url).to.equal("/" + modelName + "/update/" + dataToModify.id);
            expect(io.socket.postCalled.data).to.deep.equal(dataToModify);
        });

        it('should  filter the initial model load using the criteria specified in the third argument.', function () {
            var query = {'modelAttribute1': "4"};
            //Do the binding.
            $sailsBind.bind(modelName, $rootScope, query);
            $timeout.flush();

            //Check that things were sent to the server as expected
            expect(io.socket.requestCalled.additional).to.equal(query);

        });
    });


    describe('the bind function, when the server returns an object instead of an array', function () {
        var modelName = "myModelItem",
            defaultData;

        beforeEach(function () {
            defaultData = 
                {'id': '1', 'modelAttribute1': "string", 'modelAttribute2': 'another string'};

            //Mock the initial "get all"
            io.socket.when.get["/" + modelName] = {return: defaultData};

            //Do the binding.
            $sailsBind.bind(modelName, $rootScope);
            $timeout.flush();
        });

	it('should still create an array in the scope', function() {
            expect($rootScope[modelName + 's']).to.be.an("array");
	});
    });
});
