<?php

namespace app\controllers;

use yii\rest\ActiveController;

class SourceController extends ActiveController
{
    public $modelClass = 'app\models\Source';

    public function actionShow($id)
    {
        return $id;
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
}
