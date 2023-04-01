<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class ApiController extends Controller
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

    private $userController;
    private $sourceController;

    public function __construct($id, $module, $config = [], UserController $userController, SourceController $sourceController)
    {
        parent::__construct($id, $module, $config);
        $this->userController = $userController;
        $this->sourceController = $sourceController;
    }
    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin($login, $password)
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
     * Отображает страницу со списком источников данных.
     *
     * @return void
     */
    function actionGetSourcePage($id)
    {
        // реализация
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

    /**
     * Формирует данные для записи в localstorage браузера пользователя
     *
     * @param int $user_id идентификатор пользователя
     * @param array $sources массив источников:
     *   array("source_id" => array(1, 2, 3, ...), 
     *        "source_type" => array("query", "chart", "chart", "video", ...), 
     *        "source_link" => array("https....", "https....")) 
     * @param string size размер сетки виджетов: "2x2" | "2x3" | "3x3"
     * @return void
     */
    private function actionLocalstorage($user_id, $sources, $size)
    {
        // реализация
    }
}
