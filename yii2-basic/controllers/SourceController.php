<?php

namespace app\controllers;

use yii\rest\ActiveController;
use app\models\Source;

//ВСЕ ДЕЙСТВИЯ С ИСТОЧНИКАМИ
class SourceController extends ActiveController
{
    public $modelClass = 'app\models\Source';

    public function actionShow($id)
    {
        return $id;
    }
    public function actionDelete($id)
    {
        $model = Source::findOne($id);
        
        if (!$model) {
            return 0;
        }
        
        $model->delete();
        
        return 1;
    }
    public function actionUpdateSource($id, $name, $type, $link, $login, $pass, $time)
    {
        $model = Source::findOne($id);
        
        if (!$model) {
            return 0;
        }
        
        $model->txtSourceName = $name;
        $model->txtSourceType = $type;
        $model->txtSourceLink = $link;
        $model->txtSourceLogin = $login;
        $model->txtSourcePassword = $pass;
        $model->intTimePeriod = $time;
        $model->save();
        return 1;
    }
    /**
     * Получает данные из источника и отображает их на странице.
     *
     * @param string $link ссылка на данные источника.
     * @return void
     **/
    function actionGetQuery($link)
    {
        // реализация
    }

    /**
     * Получает данные из источника и отображает график на странице.
     *
     * @param string $link ссылка на данные источника.
     * @return void
     */
    function actionGetChart($link)
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
