var app = angular.module('myApp', ['ngRoute']);

//配置路由
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/first', { templateUrl: 'html/first.html' })
        .when('/second', { templateUrl: 'html/second.html' })
        .when('/third', {
            templateUrl: 'html/third.html',

        }).when('/fourth', {
            templateUrl: 'html/fourth.html',
        }).when('/fifth', {
            templateUrl: 'html/fifth.html',
        }).when('/sixth', {
            templateUrl: 'html/sixth.html',
        })
        .otherwise({ template: '<mark>未知路径</mark>' });
}]);

//控制器
//用户注册
app.controller('registeController', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {
    //序列化的方法。
    $scope.allFlights = function() {
        $http.post("http://192.168.21.60:8080/ticketSystem/user/register", $hps($scope.tijiao), {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
            console.log(resp)

            if (resp.status === 200) {
                alert("注册成功");
                console.log(resp)

                $("#myModal2").hide();
                //显示登录注册框。
                $('#myModal').modal({

                });
            }
        })
    }
}])

//登录部分
app.controller('loginController', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {
    $scope.login = function() {
        $http.post('http://192.168.21.60:8080/ticketSystem/user/login', $hps($scope.tijiao), {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
            console.log(resp);
            if (resp.status == 200) {

                alert('登录成功!');
                //登录成功之后跳转页面。
                location.href = "index2.html";

            }

        })
    }
}])


// 查询
app.controller('flightController', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {

        $scope.allFlights = function(pageIndex) {
            $http.post("http://192.168.21.60:8080/ticketSystem/flight/getFlightsByFuzzy", $hps(), {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            }).then(function(resp) {
                if (resp.status == 200) {
                    console.log('添加航班成功');
                    console.log(resp.data.results);
                    $scope.flight1 = resp.data.results;
                }
            })
        }
        $scope.modify = function(id) { //修改，弹出修改的模态框
            $("#myModal").modal('toggle');

            $http.post('http://192.168.21.60:8080/ticketSystem/flight/modify', $hps(), {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            }).then(function(resp) {
               console.log(resp.data);
               $scope.results=resp.data.results;
            })

        }

       $scope.modify2 = function(){
        $http.post("http://192.168.21.60:8080/ticketSystem/ticket/modifyTicket", $hps($scope.results) , {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
           console.log(resp)
            
        });
    }




        $scope.del = function(id) { //删除
            $http.post("http://192.168.21.60:8080/ticketSystem/flight/delete", "id=" + id, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            }).then(function(resp) {
                alert(resp.data.msg)
            });
        }

        $scope.add = function() { //点击添加按钮，显示添加的模态框。
            $("#add_modal").modal("toggle");
        }

        $scope.doAddFlight = function() {
            $http.post("http://192.168.21.60:8080/ticketSystem/flight/add", $hps($scope.addFlights), {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            }).then(function(resp) {

                if (resp.status == 200) {
                    console.log(resp.data);

                    alert("添加成功！");

                   // $('#add_modal input')[0].reset();//清空表单。
                }
            })

        }

 

    }]) //查询部分结束



//票数管理部分
app.controller('tickitsController', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {
    $http.post('http://192.168.21.60:8080/ticketSystem/flight/getFlightsByFuzzy', $hps(), {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
            console.log(resp.data.results);
            $scope.results = resp.data.results;
            console.log(resp.data.results[0].id);


        })
        //点击机票管理部分
    $scope.tickitsManege = function() {
        $("#container1").hide(); //隐藏
        $("#third2Container").show(); //显示

    }
}])



//机票管理部分
app.controller('manageController', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {
    $http.post('http://192.168.21.60:8080/ticketSystem/ticket/getTicketDetail', $hps(), {
        header: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(resp) {
        console.log(resp)
    })

}])


//机票预订部分
app.controller('orderFlights', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {
    $http.post('http://192.168.21.60:8080/ticketSystem/order/getFlightsByConditions', $hps(), {
        header: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(resp) {
        console.log(resp);
        $scope.results = resp.data.results;
        $scope.preorder = function() { //弹出预定框
            $("#order").show()
        }
        $scope.dorefuse = function() { //隐藏预定框
            $("#order").hide()
        }
        $scope.doSure = function() { //输入完信息之后，点击确认将信息存储
            $http.post("http://192.168.21.60:8080/ticketSystem/order/order", $hps($scope.sure), {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            }).then(function(resp) {
                console.log(resp)
            })

        }
    })
}])

//我的订单部分
app.controller('myOrderController', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {

    $scope.asd = function() {
        $scope.ICard = localStorage.ICard;
        $http.post("http://192.168.21.60:8080/ticketSystem/order/getOrderByICard?iCard=" + $scope.ICard, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
            if (resp.data.success) {
                console.log(resp.data.msg);
                $scope.arrs = resp.data.data;
                localStorage.ICard = '';
                console.log(localStorage.ICard);
            } else {
                console.log(resp.data.msg);
            }
        });
    }
    $(function() {
        $scope.asd();
    })

    $scope.doTuipiao = function(event) {
        $scope.orderNo = event.v.orderNo;
        $http.post("http://192.168.21.60:8080/ticketSystem/order/returnTicket", 'no=' + $scope.orderNo, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
            if (resp.data.success) {
                console.log(resp.data.msg);
                $scope.asd();
            } else {
                console.log(resp.data.msg);
            }
        });
    }

}]);




app.controller('myMessageController', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {
    var number;
    if ($('#login1').html()) {
        number = 152;
    } else {
        number = '';
    }
    $scope.doLoad = function() {
            $http.post("http://192.168.21.60:8080/ticketSystem/user/findUserById?userId=" + number, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            }).then(function(resp) {
                if (resp.status == 200) {
                    console.log('用户信息显示成功');
                    $scope.users = resp.data;
                    localStorage.ICard = $scope.users.userICard;

                    if (resp.data.sex != 0) {
                        $('#female').attr('checked');
                    }

                }
            });
        }
    $scope.doLoad();

    $scope.doModify2 = function() {
        $http.post("http://192.168.21.60:8080/ticketSystem/user/update", $hps($scope.users) + '&userId' + 152, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
            if (resp.data.success) {
                console.log(resp.data.msg);
            }
        });
    }
}]);









