<!doctype html>
<html>
  <header>
    <link rel="stylesheet" type="text/css" href="stylesheets/main.css" />
  </header>
  <body>
    <div id="conteneur">
      <h1>Les équipes de National League</h1>    
      <table border="1">
        <tr>
          <td>ID</td>
          <td>Club</td>
        </tr>
        <?php
        require('ctrl.php');
        $id = 1;
        foreach ($equipes as $equip) {
            echo "<tr>";
            echo "<td>" . $id . "</td>"; 
            echo "<td>" . $equip. "</td>"; 
            echo "</tr>";
            $id++;
        }
        ?>
      </table>
    </div>
  </body>
</html>
