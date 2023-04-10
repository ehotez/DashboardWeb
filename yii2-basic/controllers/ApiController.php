<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\web\Response;

class ApiController extends ActiveController
{
    private $userController;
    private $sourceController;

    public function __construct($id, $module, $config = [])
    {
        $this->userController = new UserController();
        $this->sourceController = new SourceController();
        parent::__construct($id, $module, $config);
    }
    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin($login, $password)
    {
        return "Good";
        return $this->userController->actionLogin($login, $password);
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Отображает страницу со списком источников данных.
     *
     * @return void
     */
    function actionGetSourcePage($id)
    {
    }

    /**
     * Отображает главную страницу со списком источников данных.
     * @param $sources массив источников в следующем формате:
     *   array("source_id" => array(1, 2, 3, ...), 
     *        "source_type" => array("query", "chart", "chart", "video", ...), 
     *        "source_link" => array("https....", "https....")) 
     * @return void
     */
    function actionGetMainPage($sources)
    {
        // реализация
    }

    /**
     * Получает данные из источника и отображает их на странице.
     *
     * @param string $link ссылка на данные источника.
     * @return array("query_name" => "Сколько рыб в бассейне?",
     *               "time": 1673671624,
     *               "value": 15)
     **/
    private function actionGetQuery($link)
    {
        // реализация
    }

    /**
     * Получает данные из источника.
     *
     * @param string $link ссылка на данные источника.
     * @return array("chart_name" => "График датчика pH",
     *               "time" => 1673671624,
     *               "data" => array("x_label" => "Время, с",
     *                               "y_label" => "Кислотность, pH",
     *                               "x_values" => array(1, 2,3, ..., n)
     *                               "y_values" => array(123, 5, 456, ..., n)))             
     */
    private function actionGetChart($link)
    {
        // реализация
    }
}
