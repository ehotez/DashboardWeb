<?php

namespace app\controllers;

use yii\rest\ActiveController;
use app\models\Source;

//ВСЕ ДЕЙСТВИЯ С ИСТОЧНИКАМИ
class SourceController extends ActiveController
{
    public $modelClass = 'app\models\Source';

    public function actionGetVideo($link, $name)
    {
        $command = "ffmpeg -i $link -c:v libx264 -preset veryfast -c:a aac -f hls -hls_time 2 -hls_list_size 10 ../../frontend/src/video/$name.m3u8";
        exec($command); // here we go
        //$pid = getmypid();
        //json_encode($output, JSON_INVALID_UTF8_IGNORE);
        return 'see';
    }

    public function actionStopVideo($pid){
        $command = "taskkill /IM ffmpeg.exe /F";
        //$command = "taskkill /PID $pid /f";
        exec($command);
        return $pid;
    }

    public function actionDeleteOldFiles(){
        $dir = '../../frontend/src/video';
        $extension = '.ts';
        $secondsOld = 60;

        $files = glob($dir . '/*' . $extension);
        $currentTime = time();

        foreach ($files as $file) {
            if (is_file($file)) {
                $fileCreationTime = filemtime($file);
                $timeDifference = $currentTime - $fileCreationTime;

                if ($timeDifference >= $secondsOld) {
                    unlink($file);
                }
            }
        }
        return 1;
    }

    public function actionDeleteSource($id)
    {
        $model = Source::findOne($id);

        if (!$model) {
            return 0;
        }

        $model->delete();
        return 1;
    }

    public function actionGetSources($userId)
    {
        $model = Source::findAll(['intUserId' => $userId]);
        return $model;
    }

    /**
     * Редактирует указанный источник данных и сохраняет в базу данных.
     *
     * @param int $userId идентификатор пользователя.
     * @param string $name название источника
     * @param string $type тип источника: "query" | "chart" | "video"
     * @param string $link ссылка
     * @param string $login логин пользователя (только для доступа к камере!)
     * @param string $pass пароль пользователя (только для доступа к камере!)
     * @param int $time период обновления источника
     * 
     * @return 1
     */
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
        if($model->save())
            return 1;
        else
            return 'error';
    }

    /**
     * Добавляет указанный источник данных в базу данных.
     *
     * @param int $userId идентификатор пользователя.
     * @param string $name название источника
     * @param string $type тип источника: "query" | "chart" | "video"
     * @param string $link ссылка
     * @param string $login логин пользователя (только для доступа к камере!)
     * @param string $pass пароль пользователя (только для доступа к камере!)
     * @param int $time период обновления источника
     * 
     * @return 1
     */
    public function actionAddSource($userId, $name, $type, $link, $login, $pass, $time)
    {
        $model = new Source();

        $model->intUserId = $userId;
        $model->txtSourceName = $name;
        $model->txtSourceType = $type;
        $model->txtSourceLink = $link;
        $model->txtSourceLogin = $login;
        $model->txtSourcePassword = $pass;
        $model->intTimePeriod = $time;
        $model->save();
        if($model->save())
            return 1;
        else
            return 'error';
    }
    /**
     * Получает данные из источника и отображает их на странице.
     *
     * @param string $link ссылка на данные источника.
     * @return array("query_name" => "Сколько рыб в бассейне?",
     *               "value": 15) | None(если данные не получены)
     **/
    public function actionGetQuery($link)
    {
        // реализация
    }

    /**
     * Получает данные из источника.
     *
     * @param string $link ссылка на данные источника.
     * @return array("chart_name" => "График датчика pH",
     *               "data" => array("x_label" => "Время, с",
     *                               "y_label" => "Кислотность, pH",
     *                               "x_values" => array(1, 2,3, ..., n)
     *                               "y_values" => array(123, 5, 456, ..., n))) | None(если данные не получены)           
     */
    public function actionGetChart($link)
    {
        // реализация
    }
}
