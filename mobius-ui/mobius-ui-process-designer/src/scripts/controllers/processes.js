/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

angular.module('app')
  .controller('ProcessesCtrl', ['$rootScope', '$scope', '$translate', '$http', '$timeout','$location', '$modal',
    function ($rootScope, $scope, $translate, $http, $timeout, $location, $modal) {

      var columnDefs = [
          // {headerName: '', width: 40, checkboxSelection: true, sortable: false, suppressMenu: true},
          {headerName: "Process Code",width: 60, cellRenderer: codeCellRenderFunc},
          {headerName: "Process Name", width: 50, field: "name", editable: true},
          {headerName: "Version", width: 30, field: "version"},
          {headerName: "Effective Date",width: 60, field: "lastUpdated", editable: true},
          {headerName: "Status", width: 20,field: "modelType"},
          {headerName: "Process Description",width: 60, field: "description", editable: true}
      ];

      function codeDoubleClicked(processId){
          console.log('processId: '+processId)
          $rootScope.editorHistory = [];
          $location.path("/editor/" + processId);
      }

      function codeCellRenderFunc(params){
          console.log(params)
          params.$scope.codeClicked = codeDoubleClicked;
          return '<a style="font-weight: bold;" ng-bind="data.id" ng-click="codeClicked(data.id)"></a>';
      }

      $scope.gridOptions = {
          angularCompileRows: true,
          paginationPageSize: 10,
          enableCellTextSelection: true,
          rowSelection: 'multiple',
          pagination: true,
          columnDefs: columnDefs,
          rowData: null,
          defaultColDef: {
              sortable: true,
              filter: true,
              resize: true
          },
          onGridReady: function(params) {
              params.api.sizeColumnsToFit();
          },
          onRowDoubleClicked: function(e){
              console.log(e)
              e.source.scope.codeClicked(e.data.id);
          },
          onFirstDataRendered: function(params) {
              params.api.sizeColumnsToFit();
          }
      }
      // Main page (needed for visual indicator of current page)
      $rootScope.setMainPageById('processes');
      $rootScope.formItems = undefined;

      // get latest thumbnails
      $scope.imageVersion = Date.now();

	  $scope.model = {
        filters: [
            {id: 'processes', labelKey: 'PROCESSES'}
		],

		sorts: [
		        {id: 'modifiedDesc', labelKey: 'MODIFIED-DESC'},
		        {id: 'modifiedAsc', labelKey: 'MODIFIED-ASC'},
		        {id: 'nameAsc', labelKey: 'NAME-ASC'},
		        {id: 'nameDesc', labelKey: 'NAME-DESC'}
		]
	  };

	  if ($rootScope.modelFilter) {
		  $scope.model.activeFilter = $rootScope.modelFilter.filter;
		  $scope.model.activeSort = $rootScope.modelFilter.sort;
		  $scope.model.filterText = $rootScope.modelFilter.filterText;

	  } else {
		  // By default, show first filter and use first sort
	      $scope.model.activeFilter = $scope.model.filters[0];
	      $scope.model.activeSort = $scope.model.sorts[0];
	      $rootScope.modelFilter = {
	        filter: $scope.model.activeFilter,
	        sort: $scope.model.activeSort,
	        filterText: ''
	      };
	  }

	  $scope.activateFilter = function(filter) {
		  $scope.model.activeFilter = filter;
		  $rootScope.modelFilter.filter = filter;
		  $scope.loadProcesses();
	  };

	  $scope.activateSort = function(sort) {
		  $scope.model.activeSort = sort;
		  $rootScope.modelFilter.sort = sort;
		  $scope.loadProcesses();
	  };

	  $scope.loadProcesses = function() {
		  $scope.model.loading = true;

		  var params = {
		      filter: $scope.model.activeFilter.id,
		      sort: $scope.model.activeSort.id,
		      modelType: 0
		  };

		  if ($scope.model.filterText && $scope.model.filterText != '') {
		    params.filterText = $scope.model.filterText;
		  }

		  $http({method: 'GET', url: FLOWABLE.APP_URL.getModelsUrl(), params: params}).
		  	success(function(data, status, headers, config) {
	    		$scope.model.processes = data;
	    		$scope.model.loading = false;
                $scope.gridOptions.api.setRowData($scope.model.processes.data);
	        }).
	        error(function(data, status, headers, config) {
	           console.log('Something went wrong: ' + data);
	           $scope.model.loading = false;
	        });
	  };

	  var timeoutFilter = function() {
	      $scope.model.isFilterDelayed = true;
	      $timeout(function() {
	          $scope.model.isFilterDelayed = false;
	          if ($scope.model.isFilterUpdated) {
	              $scope.model.isFilterUpdated = false;
	              timeoutFilter();
	          } else {
	              $scope.model.filterText = $scope.model.pendingFilterText;
	              $rootScope.modelFilter.filterText = $scope.model.filterText;
	              $scope.loadProcesses();
	          }
	      }, 500);
	  };

	  $scope.filterDelayed = function() {
	      if ($scope.model.isFilterDelayed) {
	          $scope.model.isFilterUpdated = true;
	      } else {
	          timeoutFilter();
	      }
	  };

	  $scope.createProcess = function(mode) {
	    var modalInstance = _internalCreateModal({
	        template: 'views/popup/process-create.html?version=' + Date.now()
	    }, $modal, $scope);
	  };

	  $scope.importProcess = function () {
          _internalCreateModal({
              template: 'views/popup/process-import.html?version=' + Date.now()
          }, $modal, $scope);
	  };

	  $scope.showProcessDetails = function(process) {
	      if (process) {
	          $rootScope.editorHistory = [];
	          $location.path("/processes/" + process.id);
	      }
	  };

	  $scope.editProcessDetails = function(process) {
		  if (process) {
		      $rootScope.editorHistory = [];
              $location.path("/editor/" + process.id);
		  }
	  };

	  // Finally, load initial processes
	  $scope.loadProcesses();

	  $scope.empty_col_def=[{
                                                          	    displayName:''
    }];

    $scope.process_data = [
      {Processes:"Prototype",
        children:[
          {Processes:"New",
            children:[
              {Processes:"New"},
              {Processes: "Validated"}
            ]},
          {Processes: "Validated"}
          ]
      },
      {Processes:"Demo",
        children:[
          {Processes:"New"},
          {Processes: "Validated"}
        ]
      },
      {Processes:"Design",
        children:[
          {Processes:"New"},
          {Processes: "Validated"}
        ]
      },
      {Processes:"Publish",
        children:[
          {Processes:"New"},
          {Processes: "Validated"}
        ]
      },
      {Processes:"Archive",
        children:[
          {Processes:"New"},
          {Processes: "Validated"}
        ]
      }
    ];

      $scope.history_data = [
        {History:"Processes",
          children:[
            {History:"process1"},
            {History: "process2"}
          ]
        },
        {History:"Forms",
          children:[
            {History:"form1"},
            {History: "form2"}
          ]
        }
      ];

  }]);

angular.module('app')
.controller('CreateNewProcessModelCtrl', ['$rootScope', '$scope', '$modal', '$http', '$location',
                                          function ($rootScope, $scope, $modal, $http, $location) {

    $scope.model = {
       loading: false,
       process: {
            Processes: '',
            key: '',
            description: '',
           	modelType: 0
       }
    };

    if ($scope.initialModelType !== undefined) {
        $scope.model.process.modelType = $scope.initialModelType;
    }

    $scope.ok = function () {

        if (!$scope.model.process.name || $scope.model.process.name.length == 0 ||
        	!$scope.model.process.key || $scope.model.process.key.length == 0) {

            return;
        }

        $scope.model.loading = true;

        $http({method: 'POST', url: FLOWABLE.APP_URL.getModelsUrl(), data: $scope.model.process}).
            success(function(data) {
                $scope.$hide();

                $scope.model.loading = false;
                $rootScope.editorHistory = [];
                $location.path("/editor/" + data.id);
            }).
            error(function(data, status, headers, config) {
                $scope.model.loading = false;
                $scope.model.errorMessage = data.message;
            });
    };

    $scope.cancel = function () {
        if(!$scope.model.loading) {
            $scope.$hide();
        }
    };
}]);

angular.module('app')
.controller('DuplicateProcessModelCtrl', ['$rootScope', '$scope', '$modal', '$http', '$location',
                                          function ($rootScope, $scope, $modal, $http, $location) {

    $scope.model = {
       loading: false,
       process: {
            Processes: '',
            key: '',
            description: ''
       }
    };

    if ($scope.originalModel) {
        //clone the model
        $scope.model.process.name = $scope.originalModel.process.name;
        $scope.model.process.key = $scope.originalModel.process.key;
        $scope.model.process.description = $scope.originalModel.process.description;
        $scope.model.process.id = $scope.originalModel.process.id;
        $scope.model.process.modelType = $scope.originalModel.process.modelType;
    }

    $scope.ok = function () {

        if (!$scope.model.process.name || $scope.model.process.name.length == 0 ||
        	!$scope.model.process.key || $scope.model.process.key.length == 0) {

            return;
        }

        $scope.model.loading = true;

        $http({method: 'POST', url: FLOWABLE.APP_URL.getCloneModelsUrl($scope.model.process.id), data: $scope.model.process}).
            success(function(data) {
                $scope.$hide();

                $scope.model.loading = false;
                $rootScope.editorHistory = [];
                $location.path("/editor/" + data.id);
            }).
            error(function(data, status, headers, config) {
                $scope.model.loading = false;
                $scope.model.errorMessage = data.message;
            });
    };

    $scope.cancel = function () {
        if(!$scope.model.loading) {
            $scope.$hide();
        }
    };
}]);

angular.module('app')
.controller('ImportProcessModelCtrl', ['$rootScope', '$scope', '$http', 'Upload', '$location', function ($rootScope, $scope, $http, Upload, $location) {

  $scope.model = {
       loading: false
  };

  $scope.onFileSelect = function($files, isIE) {

      for (var i = 0; i < $files.length; i++) {
          var file = $files[i];

          var url;
          if (isIE) {
              url = FLOWABLE.APP_URL.getImportProcessModelTextUrl();
          } else {
              url = FLOWABLE.APP_URL.getImportProcessModelUrl();
          }

          Upload.upload({
              url: url,
              method: 'POST',
              file: file
          }).progress(function(evt) {
	      $scope.model.loading = true;
              $scope.model.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);

          }).success(function(data) {
              $scope.model.loading = false;

              $location.path("/editor/" + data.id);
              $scope.$hide();

          }).error(function(data) {

              if (data && data.message) {
                  $scope.model.errorMessage = data.message;
              }

              $scope.model.error = true;
              $scope.model.loading = false;
          });
      }
  };

  $scope.cancel = function () {
	  if(!$scope.model.loading) {
		  $scope.$hide();
	  }
  };


}]);

