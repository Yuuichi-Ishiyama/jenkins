# testnodeapp1
sample node app CI/CD検証用

# 動作環境

nodejs 10系, npm, yarnがインストールされることを前提とする。

# 開発スタートアップ

## 開発環境構築

ローカル環境はwindows10、postgresql10系のインストールする必要がある。

* リポジトリからコードを clone する
    ```shell
    $ git clone https://github.com/maasproject/testnodeapp1.git
    $ cd testnodeapp1
    ```
* 依存関係を解消する
    ```shell
    $ yarn
    ```
* 関連パッケージをインストール
    ```shell
    $ yarn install_all
    ```
    ※失敗するときもあったので、継続実行したら解消される。（時間あれば調査する）
* DBマイグレーション
    postgresqlのdb情報は
    \testnodeapp1\server\databases\config\management_config.json
    を参照
    ```shell
    $ cd server
    $ yarn run sequelize db:migrate --env local
    ```
    
## ビルド起動コマンド
    プロジェクトルートディレクトリに移動
    $ yarn build
    $ yarn dev
    
# TODO
-  jenkins、sonarqubeとの連携CI

jenkinsテスト用
⇒更新 20:50->21:18
  7/2 15:13->17:01->17:17