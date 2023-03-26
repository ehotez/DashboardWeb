<?php
namespace app\controllers;

use yii\rest\ActiveController;

class SourceController extends ActiveController
{
    public $modelClass = 'app\models\Source';

    public function actionShow($id){
        return $id;
    }
}