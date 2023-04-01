<?php

namespace app\controllers;

use yii\rest\ActiveController;

//ВСЕ ДЕЙСТВИЯ С ИСТОЧНИКАМИ
class SourceController extends ActiveController
{
    public $modelClass = 'app\models\Source';

    /**
     * Удаляет указанный источник данных из базы данных.
     *
     * @param int $id идентификатор источника данных.
     * @return void
     */
    private function actionDeleteSource($source_id)
    {
        // реализация
    }

    /**
     * Редактирует указанный источник данных и сохраняет в базу данных.
     *
     * @param int $source_id идентификатор источника данных.
     * @param string $type тип источника: "query" | "chart" | "video"
     * @param string $link ссылка
     * 
     * @return void
     */
    private function actionEditSource($source_id, $type, $link)
    {
        // реализация
    }

    /**
     * Добавляет указанный источник данных в базу данных.
     *
     * @param int $source_id идентификатор источника данных.
     * @param string $type тип источника: "query" | "chart" | "video"
     * @param string $link ссылка
     * 
     * @return void
     */
    private function actionAddSource($source_id, $type, $link)
    {
        // реализация
    }

    /**
     * Добавляет указанный источник данных в базу данных.
     *
     * @param int $user_id идентификатор пользователя
     * @return array словарь источников: 
     *  array("source_id" => array(1, 2, 3, ...), 
     *        "source_type" => array("query", "chart", "chart", "video", ...), 
     *        "source_link" => array("https....", "https....")) 
     */
    private function actionGetSourcesForUser($user_id)
    {
        // реализация
    }
}
