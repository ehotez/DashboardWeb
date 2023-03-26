<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "tblUser".
 *
 * @property int $intUserId Индентификатор пользователя
 * @property string $txtIUserLogin Логин пользователя
 * @property string $txtUserPassword Пароль пользователя
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tblUser';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['txtIUserLogin', 'txtUserPassword'], 'required'],
            [['txtIUserLogin', 'txtUserPassword'], 'string', 'max' => 64],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'intUserId' => 'Int User ID',
            'txtIUserLogin' => 'Txt I User Login',
            'txtUserPassword' => 'Txt User Password',
        ];
    }
}
