<?php
namespace app\controllers;

use yii\rest\ActiveController;
use app\models\User;

//ВСЕ ДЕЙСТВИЯ С ПОЛЬЗОВАТЕЛЯМИ
class UserController extends ActiveController
{
    public $modelClass = 'app\models\User';


    public function actionLogin($login, $password)
    {
        $user = User::findByUsername($login);
        if($user){
            if($user->validatePassword($password)){
                return 'ALL GOOD';
            }
            else{
                return 'Incorrect password';
            }
        }
        else{
            return 'Incorrect login';
        }

    }

    public function actionLogout()
    {

    }

    /**
     * Отображает главную страницу сетки виджетов.
     *
     * @param int $size размер сетки виджетов.
     * @return void
     */
    function actionShowMainPage($size)
    {
        // реализация
    }

    /**
     * Обновляет локальное хранилище браузера с информацией о новом виджете.
     *
     * @param int $size размер сетки виджетов.
     * @param string $name название виджета.
     * @param string $type тип виджета.
     * @param string $link ссылка на данные для виджета.
     * @param int $position позиция виджета в сетке.
     * @param string $login логин пользователя.
     * @return void
     */
    function actionUpdateLocalstorage($size, $name, $type, $link, $position, $login)
    {
        // реализация
    }

    /**
     * Отображает страницу добавления нового источника данных на виджет.
     *
     * @return void
     */
    function actionShowAddSourceOnWidget()
    {
        // реализация
    }

    /**
     * Добавляет новый источник данных на виджет.
     *
     * @param string $name название источника.
     * @param string $type тип источника.
     * @param string $link ссылка на данные источника.
     * @return void
     */
    function actionAddSourceOnWidget($name, $type, $link)
    {
        // реализация
    }

    /**
     * Удаляет виджет с указанной позиции из сетки виджетов.
     *
     * @param int $position позиция виджета в сетке.
     * @return void
     */
    function actionDeleteWidget($position)
    {
        // реализация
    }
}
