<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tblSource".
 *
 * @property int $intSourceId Идентификатор источника
 * @property int $intUserId Идентификатор пользователя
 * @property string $txtSourceName Название источника
 * @property string $txtSourceType Тип источника
 * @property string $txtSourceLink Ссылка на источник
 * @property string $txtSourceLogin Логин для подключения к камере
 * @property string $txtSourcePassword Пароль для подключения к камере
 * @property int $intTimePeriod Частота обновления виджета источника
 */
class Source extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tblSource';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['intUserId', 'txtSourceName', 'txtSourceType', 'txtSourceLink', 'txtSourceLogin', 'txtSourcePassword', 'intTimePeriod'], 'required'],
            [['intUserId', 'intTimePeriod'], 'integer'],
            [['txtSourceName', 'txtSourceType'], 'string', 'max' => 32],
            [['txtSourceLink'], 'string', 'max' => 128],
            [['txtSourceLogin', 'txtSourcePassword'], 'string', 'max' => 64],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'intSourceId' => 'Int Source ID',
            'intUserId' => 'Int User ID',
            'txtSourceName' => 'Txt Source Name',
            'txtSourceType' => 'Txt Source Type',
            'txtSourceLink' => 'Txt Source Link',
            'txtSourceLogin' => 'Txt Source Login',
            'txtSourcePassword' => 'Txt Source Password',
            'intTimePeriod' => 'Int Time Period',
        ];
    }
}
