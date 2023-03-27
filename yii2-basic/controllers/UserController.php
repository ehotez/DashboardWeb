<?php
// namespace app\controllers;

// use yii\rest\ActiveController;

// class UserController extends ActiveController
// {
//     public $modelClass = 'app\models\User';
// }

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\rest\ActiveController;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class UserController extends ActiveController
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }
    public $modelClass = 'app\models\User';
    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
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
     * Отображает размеры сетки виджетов.
     *
     * @return void
     */
    function actionShowGridSize()
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

    /**
     * Отображает страницу со списком источников данных.
     *
     * @return void
     */
    function actionShowSourcePage()
    {
        // реализация
    }

    /**
     * Отображает страницу добавления нового источника данных.
     *
     * @return void
     */
    function actionShowAddSource()
    {
        // реализация
    }

    /**
     * Добавляет новый источник данных в базу данных.
     *
     * @return void
     */
    function actionAddSource()
    {
        // реализация
    }

    /**
     * Отображает страницу редактирования существующего источника данных.
     *
     * @param int $id идентификатор источника данных.
     * @return void
     */
    function actionShowEditSource($id)
    {
        // реализация
    }

    /**
     * Редактирует существующий источник данных в базе данных.
     *
     * @param int $id идентификатор источника данных.
     * @return void
     */
    function actionEditSource($id)
    {
        // реализация
    }

    /**
     * Отображает страницу подтверждения удаления источника данных.
     *
     * @param int $id идентификатор источника данных.
     * @return void
     */
    function actionShowDeleteSource($id)
    {
        // реализация
    }

    /**
     * Удаляет указанный источник данных из базы данных.
     *
     * @param int $id идентификатор источника данных.
     * @return void
     */
    function actionDeleteSource($id)
    {
        // реализация
    }
}
