<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\User;

//ВСЕ ДЕЙСТВИЯ С ПОЛЬЗОВАТЕЛЯМИ
class UserController extends ActiveController
{
    public $modelClass = 'app\models\User';

    /**
     * Производит вход пользователя в систему
     * 
     * @param string $login логин пользователя 
     * @param string $password пароль пользователя
     * 
     * @return int | "Incorrect password" | "Incorrect login"
     */
    public function actionLogin($login, $password)
    {
        $user = User::findByUsername($login);
        if ($user != null) {
            if ($user->validatePassword($password)) {
                Yii::$app->user->login($user);
                $indent = Yii::$app->user->id;
                return $indent;
            } else {
                return 'Incorrect login or password';
            }
        } else {
            return 'Incorrect login or password';
        }
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();
    }

    public function actionIdentity()
    {
        $id = Yii::$app->user->id;
        return $id;
    }
}
