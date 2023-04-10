<?php

namespace app\controllers;

use yii\web\Controller;
use app\models\User;

//ВСЕ ДЕЙСТВИЯ С ПОЛЬЗОВАТЕЛЯМИ
class UserController extends Controller
{
    public $modelClass = 'app\models\User';

    private function actionLogin($login, $password)
    {
        $user = User::findByUsername($login);
        if ($user) {
            if ($user->validatePassword($password)) {
                return 'ALL GOOD';
            } else {
                return 'Incorrect password';
            }
        } else {
            return 'Incorrect login';
        }
    }

    private function actionLogout()
    {
        //реализация
    }
}
