<?php

namespace app\models;

use yii\web\IdentityInterface;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "tblUser".
 *
 * @property int $intUserId Индентификатор пользователя
 * @property string $txtUserLogin Логин пользователя
 * @property string $txtUserPassword Пароль пользователя
 */
class User extends ActiveRecord implements IdentityInterface
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
            [['txtUserLogin', 'txtUserPassword'], 'required'],
            [['txtUserLogin', 'txtUserPassword'], 'string', 'max' => 64],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'intUserId' => 'Int User ID',
            'txtUserLogin' => 'Txt I User Login',
            'txtUserPassword' => 'Txt User Password',
        ];
    }

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findByUsername($login)
    {
        return static::findOne(['txtUserLogin' => $login]);
    }

    public function getId()
    {
        return $this->intUserId;
    }

    public function validatePassword($password)
    {
        return $this->txtUserPassword === $password;
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public function getAuthKey()
    {
        return 0;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }
}
